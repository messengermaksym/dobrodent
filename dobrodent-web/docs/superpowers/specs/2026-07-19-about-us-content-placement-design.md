# Design Specification: "About Us" Content Placement

Documenting the integration and styling of the clinic's "About Us" story on the Home page and the Specialists page.

## Objectives
- Integrate the historic and professional narrative of "Dobrodent" naturally into the current layout.
- Introduce a new "About Us" section on the Home page with a clean side-by-side design (text + image).
- Upgrade the header description on the Specialists page to reflect their comprehensive and team-based approach to dentistry.

## Proposed Layouts

### 1. Home Page (`src/app/page.tsx`)
A new section placed right below the Hero section (before "Why Choose Us"):
- **Structure**: Responsive 2-column layout (`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`).
- **Left Column**: Typography block using local styled fonts:
  - Header: `h2` styled title: "Раді вітати вас у медичному стоматологічному центрі «ДОБРОДЕНТ»"
  - Body paragraphs detailing the history since 2011, center location in Mukachevo, and the health benefits of a beautiful smile.
- **Right Column**: Image container wrapped in `ScrollReveal` containing `ImageWithPlaceholder` displaying `/img_9814.jpg`.

### 2. Specialists Page (`src/app/specialists/page.tsx`)
Replaces the old text in the header with the provided clinical background:
- Highlights the comprehensive list of dental professionals (orthodontists, surgeons, therapists, orthopedists, hygienists).
- Emphasizes the multidisciplinary approach (cooperation between doctors of different specialties, detailed plans, modern materials).
