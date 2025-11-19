# React Shadcn Template - AI Coding Instructions

## Architecture Overview

React + Shadcn/ui + React Query + React Router v6 + TypeScript + Tailwind CSS

## Essential Rules

### 1. Naming Conventions

- **Files**: Always `kebab-case` (`user-card.tsx`, `login-form.tsx`)
- **Components**: Always `PascalCase` (`UserCard`, `LoginForm`)
- **Exports**: Named exports for components, default exports ONLY for pages

### 2. API Layer (CRITICAL)

**Use helper functions from `src/api/helpers.ts` to create API hooks:**

```typescript
// ✅ GET request hook
export const useGetUsers = createGetQueryHook({
  endpoint: "account/user",
  responseSchema: BaseResponseSchema(z.array(UserSchema)),
  rQueryParams: { queryKey: ["users"] },
});

// ✅ POST/PUT/DELETE mutation hook
export const useCreateUser = createPostMutationHook({
  endpoint: "account/user",
  bodySchema: CreateUserSchema,
  responseSchema: BaseResponseSchema(UserSchema),
  rMutationParams: {
    onSuccess: () => toast.success("User created"),
  },
});
```

**Critical Rules:**

1. **API calls** → MUST use hooks in `src/hooks/api/`
2. **API DTOs** (request/response) → MUST define in `src/api/dtos/`
3. **Entity schemas** → Define in `src/api/entities/`
4. **UI/Logic hooks** → Define in `src/hooks/`
5. **Form schemas** (local use) → Define in component file

**Helper Functions Available:**

- `createGetQueryHook` - For GET requests
- `createPostMutationHook` - For POST requests
- `createPutMutationHook` - For PUT requests
- `createPatchMutationHook` - For PATCH requests
- `createDeleteMutationHook` - For DELETE requests

### 3. Routing

Routes are centrally defined in `src/routes/paths.ts`:

```typescript
export const paths = {
  auth: {
    root: "/auth",
    login: "/auth/login",
    register: "/auth/register",
  },
  dashboard: {
    root: "/dashboard",
    users: {
      root: "/dashboard/users",
      view: (userId: string) => `/dashboard/users/${userId}`,
    },
  },
} as const;
```

**Guards:**

- `GuestGuard` - Protects auth pages (redirects if authenticated)
- `AuthGuard` - Protects private pages (redirects if not authenticated)

### 4. Page Structure (CRITICAL)

**Page file (`index.tsx`)**: NO hooks, NO logic, ONLY composition
**Component files**: ALL logic, hooks, state management

```tsx
// ✅ Page - composition only
export default function LoginPage() {
  return (
    <div className="container">
      <LoginForm />
    </div>
  );
}

// ✅ Component - contains all logic
export function LoginForm() {
  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (data) => {
    login({ variables: { method: "password", data } });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### 5. Form Implementation Pattern

**Key Patterns:**

- Use form validation schema in component file
- Transform form values to match API contracts in `handleSubmit`
- Include loading states (`isPending` from mutation hook)

```tsx
const loginFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm() {
  const { mutate: login, isPending } = useLogin();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate then call API
    login({ variables: { method: "password", data: formData } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={formData.username}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, username: e.target.value }))
        }
        disabled={isPending}
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Loading..." : "Login"}
      </Button>
    </form>
  );
}
```

## Project Structure

```
src/
├── api/
│   ├── axios.ts              # Axios instance with interceptors
│   ├── helpers.ts            # API hook factories (createGetQueryHook, etc.)
│   ├── common.ts             # Common schemas (BaseResponseSchema)
│   ├── dtos/                 # Request/Response schemas
│   └── entities/             # Domain models
├── components/
│   ├── ui/                   # Shadcn components
│   └── [reusable-components] # Shared components (2+ pages)
├── hooks/
│   ├── api/                  # API hooks (useLogin, useGetUsers)
│   └── [ui-hooks]            # UI/Logic hooks (useAuth, useModal)
├── pages/
│   └── [feature]/
│       ├── index.tsx         # Page (default export, NO logic)
│       └── [components].tsx  # Components with logic
├── providers/                # Context providers
├── routes/
│   ├── paths.ts              # Route definitions
│   └── router.tsx            # Route configuration
└── types/                    # Shared TypeScript types
```

## Quick Workflow

### Adding API Integration

1. Define DTOs in `src/api/dtos/auth.ts`
2. Create hook in `src/hooks/api/auth.ts` using helper functions
3. Use hook in component with form schema

### Creating New Page

1. Create `src/pages/[feature]/index.tsx` (default export, NO logic)
2. Create `src/pages/[feature]/[component].tsx` (business logic)
3. Create API hook in `src/hooks/api/` using helper functions
4. Define DTOs in `src/api/dtos/`

## Key Notes

- **API hooks**: `src/hooks/api/` - NO EXCEPTIONS
- **UI hooks**: `src/hooks/` (e.g., `useAuth`, `useModal`)
- **API DTOs**: `src/api/dtos/` for backend contracts
- **Form schemas**: Component files for client validation
- **Helper functions**: Always use `createGetQueryHook`, `createPostMutationHook`, etc.
- **Import**: Use `@/` alias for src imports
- **Styling**: Tailwind CSS with `cn()` utility for conditional classes

```

```
