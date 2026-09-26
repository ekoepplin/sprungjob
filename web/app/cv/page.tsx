"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CVProfile, CV_STORAGE_KEY, CV_TEMPLATE_STORAGE_KEY, emptyProfile } from "@/lib/cv";
import { CV_TEMPLATES, DEFAULT_TEMPLATE_ID, getTemplate } from "@/lib/cv-templates";

const inputClass =
  "w-full border-b border-line bg-transparent px-1 py-1.5 outline-none placeholder:text-muted/60 focus:border-accent";
const labelClass = "font-mono text-xs uppercase tracking-widest text-muted";

export default function CvPage() {
  return (
    <Suspense fallback={null}>
      <CvEditor />
    </Suspense>
  );
}

function CvEditor() {
  const searchParams = useSearchParams();
  const jobTitle = searchParams.get("title");
  const jobCompany = searchParams.get("company");

  const [profile, setProfile] = useState<CVProfile>(emptyProfile);
  const [templateId, setTemplateId] = useState(DEFAULT_TEMPLATE_ID);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CV_STORAGE_KEY);
      if (raw) setProfile(JSON.parse(raw));
      const savedTemplate = localStorage.getItem(CV_TEMPLATE_STORAGE_KEY);
      if (savedTemplate) setTemplateId(getTemplate(savedTemplate).id);
    } catch {
      // ignore corrupt/blocked storage, start fresh
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // storage unavailable (private mode etc.) — preview still works
    }
  }, [profile, loaded]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(CV_TEMPLATE_STORAGE_KEY, templateId);
    } catch {
      // storage unavailable — the choice just isn't remembered
    }
  }, [templateId, loaded]);

  const html = getTemplate(templateId).render(profile);

  function downloadPdf() {
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.top = "-10000px";
    iframe.srcdoc = html;
    iframe.onload = () => {
      iframe.contentWindow?.print();
      setTimeout(() => document.body.removeChild(iframe), 1000);
    };
    document.body.appendChild(iframe);
  }

  return (
    <div className="flex flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 sm:px-10">
        <Link href="/" className="font-display text-xl tracking-tight">
          Sprungjob
        </Link>
        <Link
          href="/jobs"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground"
        >
          Zurück zu Jobs
        </Link>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-24 sm:px-10">
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
          CV erstellen.
        </h1>

        {jobTitle && (
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-accent">
            Für: {jobTitle}
            {jobCompany ? ` · ${jobCompany}` : ""}
          </p>
        )}

        <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-14">
            <Section title="Persönliche Angaben">
              <Field label="Foto" hint="PNG oder JPG, max. 3 MB. Optional." className="mb-6">
                <div className="flex items-center gap-4">
                  {profile.photo && (
                    <img
                      src={profile.photo}
                      alt="Vorschau"
                      className="h-16 w-16 rounded-full border border-line object-cover"
                    />
                  )}
                  <label className="cursor-pointer font-mono text-xs uppercase tracking-widest text-foreground underline decoration-line underline-offset-4 hover:decoration-accent">
                    Datei auswählen
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(e) => handlePhotoChange(e, profile, setProfile)}
                      className="sr-only"
                    />
                  </label>
                  {profile.photo && (
                    <RemoveButton onClick={() => setProfile({ ...profile, photo: "" })} />
                  )}
                </div>
              </Field>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field label="Name">
                  <input
                    className={inputClass}
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </Field>
                <Field
                  label="Tagline"
                  hint='Kurzer Satz unter deinem Namen, der zeigt wer du bist. Beispiel: "Motivierte Quereinsteigerin mit Fokus auf Kundenservice"'
                >
                  <input
                    className={inputClass}
                    value={profile.tagline}
                    onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                  />
                </Field>
                <Field label="E-Mail">
                  <input
                    className={inputClass}
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </Field>
                <Field label="Telefon">
                  <input
                    className={inputClass}
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </Field>
                <Field label="Ort">
                  <input
                    className={inputClass}
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  />
                </Field>
                <Field label="Webseite">
                  <input
                    className={inputClass}
                    value={profile.homepage}
                    onChange={(e) => setProfile({ ...profile, homepage: e.target.value })}
                  />
                </Field>
              </div>
            </Section>

            <Section title="Berufserfahrung">
              <div className="space-y-8">
                {profile.experience.map((exp, i) => (
                  <div key={i} className="space-y-4 border-b border-line pb-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <Field label="Position">
                        <input
                          className={inputClass}
                          value={exp.title}
                          onChange={(e) =>
                            updateAt(profile, setProfile, "experience", i, {
                              ...exp,
                              title: e.target.value,
                            })
                          }
                        />
                      </Field>
                      <Field label="Unternehmen">
                        <input
                          className={inputClass}
                          value={exp.company}
                          onChange={(e) =>
                            updateAt(profile, setProfile, "experience", i, {
                              ...exp,
                              company: e.target.value,
                            })
                          }
                        />
                      </Field>
                      <Field label="Zeitraum">
                        <input
                          className={inputClass}
                          placeholder="2023 – heute"
                          value={exp.dates}
                          onChange={(e) =>
                            updateAt(profile, setProfile, "experience", i, {
                              ...exp,
                              dates: e.target.value,
                            })
                          }
                        />
                      </Field>
                      <Field label="Ort">
                        <input
                          className={inputClass}
                          value={exp.location}
                          onChange={(e) =>
                            updateAt(profile, setProfile, "experience", i, {
                              ...exp,
                              location: e.target.value,
                            })
                          }
                        />
                      </Field>
                    </div>
                    <Field
                      label="Stationen (eine pro Zeile)"
                      hint='Konkrete Aufgaben oder Erfolge, je Zeile ein Punkt. Beispiel: "Kassenabwicklung und Kundenberatung im Tagesgeschäft"'
                    >
                      <textarea
                        className={`${inputClass} min-h-20 resize-y`}
                        value={exp.bullets.join("\n")}
                        onChange={(e) =>
                          updateAt(profile, setProfile, "experience", i, {
                            ...exp,
                            bullets: e.target.value.split("\n"),
                          })
                        }
                      />
                    </Field>
                    <RemoveButton
                      onClick={() => removeAt(profile, setProfile, "experience", i)}
                    />
                  </div>
                ))}
                <AddButton
                  label="Station hinzufügen"
                  onClick={() =>
                    setProfile({
                      ...profile,
                      experience: [
                        ...profile.experience,
                        { title: "", company: "", dates: "", location: "", bullets: [""] },
                      ],
                    })
                  }
                />
              </div>
            </Section>

            <Section title="Ausbildung">
              <div className="space-y-6">
                {profile.education.map((edu, i) => (
                  <div key={i} className="grid grid-cols-1 gap-6 border-b border-line pb-6 sm:grid-cols-3">
                    <Field label="Abschluss">
                      <input
                        className={inputClass}
                        value={edu.degree}
                        onChange={(e) =>
                          updateAt(profile, setProfile, "education", i, {
                            ...edu,
                            degree: e.target.value,
                          })
                        }
                      />
                    </Field>
                    <Field label="Institution">
                      <input
                        className={inputClass}
                        value={edu.school}
                        onChange={(e) =>
                          updateAt(profile, setProfile, "education", i, {
                            ...edu,
                            school: e.target.value,
                          })
                        }
                      />
                    </Field>
                    <Field label="Zeitraum">
                      <input
                        className={inputClass}
                        value={edu.dates}
                        onChange={(e) =>
                          updateAt(profile, setProfile, "education", i, {
                            ...edu,
                            dates: e.target.value,
                          })
                        }
                      />
                    </Field>
                  </div>
                ))}
                <AddButton
                  label="Ausbildung hinzufügen"
                  onClick={() =>
                    setProfile({
                      ...profile,
                      education: [...profile.education, { degree: "", school: "", dates: "" }],
                    })
                  }
                />
              </div>
            </Section>

            <Section title="Skills">
              <div className="space-y-4">
                {profile.skills.map((skill, i) => (
                  <div key={i} className="flex items-end gap-6">
                    <Field label="Skill" className="flex-1">
                      <input
                        className={inputClass}
                        value={skill.name}
                        onChange={(e) =>
                          updateAt(profile, setProfile, "skills", i, {
                            ...skill,
                            name: e.target.value,
                          })
                        }
                      />
                    </Field>
                    <Field
                      label="Niveau (1–5)"
                      hint="Eigene Einschätzung deines Könnens. 1 = Grundkenntnisse, 5 = Experte. Beispiel: Excel = 3"
                    >
                      <input
                        type="number"
                        min={1}
                        max={5}
                        className={`${inputClass} w-20`}
                        value={skill.rating}
                        onChange={(e) =>
                          updateAt(profile, setProfile, "skills", i, {
                            ...skill,
                            rating: Number(e.target.value),
                          })
                        }
                      />
                    </Field>
                  </div>
                ))}
                <AddButton
                  label="Skill hinzufügen"
                  onClick={() =>
                    setProfile({
                      ...profile,
                      skills: [...profile.skills, { name: "", rating: 3 }],
                    })
                  }
                />
              </div>
            </Section>

            <Section title="Stärken">
              <Field
                label="Kommagetrennt"
                hint='Persönliche Eigenschaften, die dich auszeichnen. Beispiel: "Zuverlässig, Teamfähig, Belastbar"'
              >
                <input
                  className={inputClass}
                  placeholder="z. B. Typografie, Teamplayer, Detailauge"
                  value={profile.strengths.join(", ")}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      strengths: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                />
              </Field>
            </Section>
          </div>

          <div className="lg:sticky lg:top-10 lg:self-start">
            <TemplateSlider templateId={templateId} html={html} onChange={setTemplateId} />
            <button
              onClick={downloadPdf}
              className="mt-6 inline-flex w-full items-center justify-center bg-accent px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-accent-ink transition-opacity hover:opacity-90"
            >
              Als PDF herunterladen
            </button>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-10 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <span>&copy; {new Date().getFullYear()} Sprungjob</span>
          <span>Jobdaten: Jobsuche der Bundesagentur für Arbeit</span>
        </div>
      </footer>
    </div>
  );
}

const SWIPE_MIN_PX = 80; // inside the half-scale preview → 40 px on screen

function TemplateSlider({
  templateId,
  html,
  onChange,
}: {
  templateId: string;
  html: string;
  onChange: (id: string) => void;
}) {
  const index = CV_TEMPLATES.findIndex((t) => t.id === getTemplate(templateId).id);
  const template = CV_TEMPLATES[index];
  // Which side the new template slides in from; null on first render (no animation).
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);

  function go(target: number, dir: "next" | "prev") {
    const n = CV_TEMPLATES.length;
    setDirection(dir);
    onChange(CV_TEMPLATES[(target + n) % n].id);
  }
  // The swipe listeners live inside the iframe document; the ref keeps them on the current index.
  const stepRef = useRef<(delta: 1 | -1) => void>(() => {});
  useEffect(() => {
    stepRef.current = (delta) => go(index + delta, delta > 0 ? "next" : "prev");
  });

  function attachSwipe(e: React.SyntheticEvent<HTMLIFrameElement>) {
    const doc = e.currentTarget.contentDocument;
    if (!doc) return;
    let start: { x: number; y: number } | null = null;
    doc.addEventListener(
      "touchstart",
      (ev) => (start = { x: ev.touches[0].clientX, y: ev.touches[0].clientY }),
      { passive: true },
    );
    doc.addEventListener("touchend", (ev) => {
      if (!start) return;
      const dx = ev.changedTouches[0].clientX - start.x;
      const dy = ev.changedTouches[0].clientY - start.y;
      start = null;
      if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy)) return;
      stepRef.current(dx < 0 ? 1 : -1);
    });
  }

  const arrowClass =
    "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-background/85 text-lg leading-none text-muted opacity-0 backdrop-blur transition-opacity hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100 pointer-coarse:opacity-100";

  return (
    <div
      role="group"
      aria-roledescription="Karussell"
      aria-label="CV-Vorlage"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1, "next");
        if (e.key === "ArrowLeft") go(index - 1, "prev");
      }}
      className="outline-none focus-visible:ring-1 focus-visible:ring-accent"
    >
      <div className="group relative" style={{ width: 400 }}>
        <div className="overflow-hidden border border-line" style={{ width: 400, height: 566 }}>
          <iframe
            key={template.id}
            title={`CV Vorschau: ${template.label}`}
            srcDoc={html}
            onLoad={attachSwipe}
            className={direction ? `cv-slide-${direction}` : undefined}
            style={{ width: 800, height: 1131, transform: "scale(0.5)", transformOrigin: "top left", border: "none" }}
          />
        </div>
        <button
          type="button"
          aria-label="Vorheriges Template"
          onClick={() => go(index - 1, "prev")}
          className={`${arrowClass} left-3`}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Nächstes Template"
          onClick={() => go(index + 1, "next")}
          className={`${arrowClass} right-3`}
        >
          ›
        </button>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6" style={{ width: 400 }}>
        <div aria-live="polite">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground">
            {template.label}
            <span className="text-muted">
              {" "}
              · {index + 1}/{CV_TEMPLATES.length}
            </span>
          </p>
          <p className="mt-1 text-xs text-muted">{template.description}</p>
        </div>
        <div className="flex shrink-0 items-center pt-0.5">
          {CV_TEMPLATES.map((t, i) => (
            <button
              key={t.id}
              type="button"
              aria-label={t.label}
              aria-current={i === index}
              onClick={() => i !== index && go(i, i > index ? "next" : "prev")}
              className="p-1"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-5 bg-accent" : "w-1.5 bg-line hover:bg-muted"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className={`${labelClass} flex items-center gap-1.5`}>
        {label}
        {hint && <InfoHint text={hint} />}
      </span>
      {children}
    </label>
  );
}

function InfoHint({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex normal-case tracking-normal">
      <span
        tabIndex={0}
        className="flex h-3.5 w-3.5 cursor-help items-center justify-center rounded-full border border-muted/60 text-[9px] leading-none text-muted focus:outline-none focus:border-accent"
      >
        ?
      </span>
      <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 w-48 -translate-x-1/2 rounded bg-foreground px-2.5 py-1.5 text-[11px] normal-case leading-snug text-background opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
        {text}
      </span>
    </span>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-mono text-xs uppercase tracking-widest text-foreground underline decoration-line underline-offset-4 hover:decoration-accent"
    >
      + {label}
    </button>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent"
    >
      Entfernen
    </button>
  );
}

const MAX_PHOTO_BYTES = 3 * 1024 * 1024;

function handlePhotoChange(
  e: React.ChangeEvent<HTMLInputElement>,
  profile: CVProfile,
  setProfile: (p: CVProfile) => void,
) {
  const file = e.target.files?.[0];
  e.target.value = "";
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    alert("Bitte eine Bilddatei auswählen (PNG, JPG, WebP).");
    return;
  }
  if (file.size > MAX_PHOTO_BYTES) {
    alert("Bild ist zu groß. Maximal 3 MB.");
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => setProfile({ ...profile, photo: downscalePhoto(img) });
    img.onerror = () => alert("Bild konnte nicht gelesen werden.");
    img.src = reader.result as string;
  };
  reader.readAsDataURL(file);
}

// A raw 3 MB photo is ~4 MB as a data URL — enough to blow the ~5 MB
// localStorage quota, so the profile silently stops saving. The CV shows the
// photo at 32 mm, so 600 px is plenty and lands around 50–100 KB.
const PHOTO_MAX_PX = 600;

function downscalePhoto(img: HTMLImageElement): string {
  const scale = Math.min(1, PHOTO_MAX_PX / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  const ctx = canvas.getContext("2d")!;
  // JPEG has no alpha — without a fill, transparent PNG areas turn black.
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.85);
}

function updateAt<K extends keyof CVProfile>(
  profile: CVProfile,
  setProfile: (p: CVProfile) => void,
  key: K,
  index: number,
  value: CVProfile[K] extends (infer U)[] ? U : never,
) {
  const list = [...(profile[key] as unknown[])];
  list[index] = value;
  setProfile({ ...profile, [key]: list });
}

function removeAt<K extends keyof CVProfile>(
  profile: CVProfile,
  setProfile: (p: CVProfile) => void,
  key: K,
  index: number,
) {
  const list = (profile[key] as unknown[]).filter((_, i) => i !== index);
  setProfile({ ...profile, [key]: list });
}
