import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, MessageSquare, Copy, Check } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { RevealGroup, RevealItem } from "../components/shared/Reveal";

const ICON_MAP = { github: Github, linkedin: Linkedin, discord: MessageSquare };

function CopyEmail({ email }) {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try { await navigator.clipboard.writeText(email); }
        catch { window.location.href = `mailto:${email}`; return; }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button onClick={copy} aria-label={copied ? "Copied!" : "Copy email address"}
            className="p-1.5 rounded-lg border transition-all hover:opacity-60 cursor-pointer"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--surface-2)" }}>
            {copied ? <Check size={12} /> : <Copy size={12} />}
        </button>
    );
}

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const [state, setState] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);

    const onChange = (e) => setState({ ...state, [e.target.name]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();
        const s = encodeURIComponent(`Portfolio Contact from ${state.name}`);
        const b = encodeURIComponent(`Name: ${state.name}\nEmail: ${state.email}\n\n${state.message}`);
        window.location.href = `mailto:${portfolio.contact.email}?subject=${s}&body=${b}`;
        setSent(true);
    };

    return (
        <section id="contact" className="py-28 px-6" aria-labelledby="contact-heading">
            <div className="max-w-5xl mx-auto">
                <RevealGroup className="mb-12">
                    <RevealItem><p className="section-label mb-3">05 / Contact</p></RevealItem>
                    <RevealItem>
                        <h2 id="contact-heading" className="t-headline mb-2" style={{ color: "var(--text)" }}>
                            $ ping me
                        </h2>
                    </RevealItem>
                    <RevealItem>
                        <p className="t-small t-mono" style={{ color: "var(--text-subtle)" }}>
                            // Response time: faster than most PR reviews. (Really.)
                        </p>
                    </RevealItem>
                </RevealGroup>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-8"
                    >
                        <p className="t-body" style={{ color: "var(--text-muted)" }}>
                            Open for freelance, collabs, or just a dev-to-dev chat about React, animations, or security.
                            No pitch decks — just say hi.
                        </p>

                        <div ref={ref}>
                            <p className="section-label mb-2">Direct email</p>
                            <div className="flex items-center gap-2">
                                <a href={`mailto:${portfolio.contact.email}`}
                                    className="t-small t-mono hover:opacity-60 transition-opacity"
                                    style={{ color: "var(--text)" }}>
                                    {portfolio.contact.email}
                                </a>
                                <CopyEmail email={portfolio.contact.email} />
                            </div>
                        </div>

                        {portfolio.contact.discord && (
                            <div>
                                <p className="section-label mb-2">Discord</p>
                                <p className="t-small t-mono" style={{ color: "var(--text-muted)" }}>{portfolio.contact.discord}</p>
                            </div>
                        )}

                        <div>
                            <p className="section-label mb-3">Elsewhere</p>
                            <div className="flex gap-2">
                                {portfolio.socials.map(({ label, href, icon }) => {
                                    const Icon = ICON_MAP[icon];
                                    if (!Icon) return null;
                                    return (
                                        <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                                            aria-label={label}
                                            className="p-2.5 rounded-xl border transition-opacity hover:opacity-60"
                                            style={{ color: "var(--text-muted)", borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
                                            <Icon size={15} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        onSubmit={onSubmit} className="space-y-4" noValidate aria-label="Contact form"
                    >
                        <div>
                            <label htmlFor="c-name" className="block section-label mb-1.5">Name</label>
                            <Input id="c-name" name="name" type="text" required
                                value={state.name} onChange={onChange} placeholder="Your name" />
                        </div>
                        <div>
                            <label htmlFor="c-email" className="block section-label mb-1.5">Email</label>
                            <Input id="c-email" name="email" type="email" required
                                value={state.email} onChange={onChange} placeholder="you@example.com" />
                        </div>
                        <div>
                            <label htmlFor="c-message" className="block section-label mb-1.5">Message</label>
                            <Textarea id="c-message" name="message" required rows={5}
                                value={state.message} onChange={onChange}
                                placeholder="What are you working on?" />
                        </div>
                        <button type="submit"
                            className="w-full py-3 rounded-xl t-small t-mono font-semibold transition-opacity hover:opacity-80 cursor-pointer"
                            style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}>
                            {sent ? "$ message_sent ✓" : "$ send_message --secure"}
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
