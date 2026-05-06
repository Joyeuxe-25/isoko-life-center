# AGENTS.md

Permanent working rules for Codex and other agents working on the Isoko Life Center website.

## 1. Project Mission

The Isoko Life Center website should present Isoko Life Center as a trusted wellness center in Kigali, founded in 2013. The site should communicate a broader wellness mission that includes herbal and plant-based care, massage and reflexology, nutrition and lifestyle guidance, counseling and trauma support, consultations, wellness products, and professional collaboration opportunities.

The website should feel professional, calm, trustworthy, and grounded in natural health and wellness. It should protect the client's real branding and avoid confusing Isoko Life Center with unrelated businesses or outdated promotional material.

## 2. Strict Workflow Rules

- Work phase by phase.
- Inspect the project before editing.
- Do not make broad refactors without approval.
- Do not delete pages or assets unless explicitly asked.
- Do not rebuild the site in React, Next.js, Vite, or another framework.
- Do not install dependencies.
- Do not run package installation commands.
- Do not invent missing image filenames.
- If required assets are missing, stop and ask the human to upload them.
- Keep changes small, safe, and reversible.
- After every phase, report files inspected, files changed, what changed, risks, and manual tests.

## 3. Branding Rules

- Use "Isoko Life Center" as the main public brand name.
- "Isoko Life Center Ltd" may be used in legal, footer, or formal contexts.
- Use the uploaded official logo when available.
- Do not use the temporary "IL" logo once the real logo is available.
- Do not use the old radio/contact poster as a design asset.
- Do not use Zion Wellness & Spa branding.
- Do not use images with old phone numbers, old Gmail addresses, or wrong business branding.
- Maintain a professional natural-health and wellness look using green, cream, white, botanical, and calm spa tones.

## 4. Approved Contact Information

- Email: info@isokolifecenter.com
- Phone / Call / WhatsApp: +250 788 333 339

Rules:

- Phone links should use `tel:` behavior.
- Email links should use `mailto:` behavior.
- WhatsApp links should use the approved phone number.
- Put a call button or icon before the phone number where contact information is shown visually.
- Remove or avoid old contacts such as old Gmail addresses or old numbers.

## 5. Content and Medical-Safety Rules

- Avoid medical overclaiming.
- Do not say Isoko "cures," "guarantees treatment," or "replaces hospitals."
- Use safer language such as "supports," "guides," "helps manage," "wellness support," "professional guidance," and "referral to specialists."
- Health-related content should remain respectful, factual, and cautious.
- Serious or urgent health problems should be directed to qualified medical care.
- The site should explain that complex cases may be referred to specialists.

## 6. Language and Translation Rules

- Preserve and extend the existing `data-i18n` system.
- New visible text should use translation keys when possible.
- Support English, Kinyarwanda, and French where the current translation system supports them.
- Do not leave newly added major sections hardcoded in only one language unless the phase explicitly allows it.
- Kinyarwanda content should be polished naturally, not translated word-for-word if that sounds unprofessional.

## 7. Asset Rules

Approved future asset folder structure:

- `assets/images/logo/`
- `assets/images/hero/`
- `assets/images/products/`
- `assets/images/facility/`
- `assets/images/services/`
- `assets/images/promos/`

Approved image asset names expected later:

- `logo.jpeg`
- `serene_spa_lobby_with_natural_light.png`
- `natural_wellness_supplement_display.png`
- `herbal_supplement_on_marble_slab.png`
- `natural_beauty_in_botanical_elegance.png`
- `calm_serenity_in_spa_essentials.png`
- `natural_wellness_tranquility_arrangement.png`
- `image1.jpeg`
- `image2.jpeg`
- `image3.jpeg`
- `image4.jpeg`
- `service.jpeg`
- `solution.jpeg`
- `relax_and_rejuvenate_at_isoko_life_center.png`

Rules:

- Use real facility photos to build trust.
- Use generated product photos for product or category visuals when real product photos are unavailable.
- Do not pretend generated product images are exact real packaging.
- Use the edited Isoko poster only as a promo or flyer asset, not as the main homepage hero.
- Do not use `contact.jpeg` if it is the old radio/contact banner.
- Do not use any Zion-branded asset.

## 8. Technical Rules

- Preserve the static HTML/CSS/JS structure.
- Preserve GitHub Pages compatibility.
- Be careful with relative paths.
- Avoid absolute `/isoko-life-center/` paths unless clearly required.
- Keep shared CSS in `css/main.css`, `css/sections.css`, and `css/hero.css`.
- Keep shared JS in `js/components.js`, `js/main.js`, and `js/translations.js`.
- Prefer centralizing repeated logic instead of duplicating inline scripts.
- Do not break header/footer injection through `js/components.js`.
- Do not break product filters, language switching, or enquiry buttons.

## 9. Employee Login/Register Rules

- Employee login/register pages are for staff only, not public customers.
- Do not imply the static site provides real secure authentication.
- If no backend or auth service exists, login/register pages must be UI placeholders only.
- Public navigation may show "Employee Login," but "Register" should not invite the public to create accounts.
- Registration should be described as authorized staff only.

## 10. Required Phase Report Format

After every phase, Codex must report:

- Files inspected
- Files changed
- What changed
- What was intentionally not changed
- Risks or things to verify
- Missing assets/information needed from the human
- Commands or manual checks the human should run
- Suggested next phase
