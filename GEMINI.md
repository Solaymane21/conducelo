# Custom Rules & Preferences

## 🎨 UI & Styling
- Avoid creating custom CSS classes or writing CSS files when possible.
- Use **Tailwind CSS** classes (e.g. `flex`, `items-center`, `justify-center`, `w-full`, `max-w-md`, `p-6`, etc.) and **PrimeNG** built-in styles.
- Keep `.css` files as empty as possible, using them only for special component-scoped styling (like deep selector overrides `::ng-deep`).

## 💬 Code Comments
- All comments must be written in **lowercase** plain text only.
- Do NOT use decorative header lines, dashes (`-----`), equal signs (`======`), or boxes around comments.
- Example:
  - Good: `// load user details from database`
  - Bad: `// ===============================`
