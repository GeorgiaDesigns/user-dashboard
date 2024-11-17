# This is a user **dashboard management** project built with:

- Typescript
- Vite
- React
  - react-hook-form
  - react-router-dom
  - axios
- Tailwind css
- Cypress

## Inicializing the project

to install the docker container, run

```bash
docker pull peachg/user-dashboard-server:latest
```

If you wish to install directly from github, clone this repo, then run

```bash
yarn install
yarn build
yarn dev
```

and the project will be made available on http://localhost:8080/

## Project structure

```bash
/src
├── /components
│   └── /
├── /hooks
├── /libs
│   └── /
├── /pages
├── /styles
```

## Usage of hooks

### useAuth

This custom React hook provides a centralized authentication context for managing user state, authentication tokens, and navigation within your application. It includes the following key features:

Authentication State Management: Tracks the currently logged-in user and authentication token, with persistence via localStorage.

- Login Flow: Validates user credentials, retrieves an authentication token, fetches the user's details, and redirects to the dashboard.
- Logout: Clears user state and token, and redirects to the login page.
- Context Provider: Wraps your application, allowing easy access to authentication state and actions through the useAuth() hook.

### Usage:

1. Wrap your app with AuthProvider:

```tsx
import AuthProvider from "./path/to/AuthProvider";

function App() {
  return (
    <AuthProvider>{/* Your application routes/components */}</AuthProvider>
  );
}
```

2. Access the authentication context:

```tsx
import { useAuth } from "./path/to/AuthProvider";

function MyComponent() {
  const { user, loginAction, logout, loading } = useAuth();

  // Example usage:
  const handleLogin = async () => {
    await loginAction({ email: "user@example.com", password: "password" });
  };

  return (
    <div>
      {loading ? <p>Loading...</p> : <p>Welcome, {user?.name}</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### usePagination

This custom React hook simplifies the implementation of pagination for paginated APIs. It manages current page state, handles data fetching, and provides utility functions for navigating through pages.

### Features

- Data Fetching: Automatically fetches paginated data based on the current page and items per page using a provided fetch function.
- Page Navigation: Includes helper methods (prev and next) to navigate between pages, with boundary checks.
- State Management: Tracks the current page, loading state, fetched data, and total number of pages.

### Usage

1. Define a fetch function that matches the expected signature:

```tsx
async function fetchUsers(page: number, perPage: number): Promise<UserList> {
  const response = await fetch(`/api/users?page=${page}&perPage=${perPage}`);
  return response.json();
}
```

2. Use the hook in your component:

```tsx
import usePagination from "./path/to/usePagination";

function UserList() {
  const { users, loading, currentPage, totalPages, prev, next } = usePagination(
    fetchUsers,
    10
  ); // 10 items per page

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <div>
        <button onClick={prev} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={next} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
```

### Parameters

- fetchFunc: A function that accepts page and perPage as arguments and returns a promise resolving to a UserList.
- itemsPerPage: Number of items to display per page.

### Return Values

- users: The array of fetched items for the current page.
- loading: Indicates if data is being fetched.
- currentPage: The current page number.
- totalPages: The total number of pages available (if provided in the API response).
- prev and next: Functions to navigate between pages.

## Form component

The Form component is a reusable and dynamic form builder built using the react-hook-form library. It streamlines form creation with validation and submission handling, supporting various input types and custom validation rules.

### Features

- **Dynamic Inputs:** Accepts a customizable list of inputs, each with its type, placeholder, and validation rules.
- **Validation:** Utilizes react-hook-form's robust validation system, including conditional and cross-field validation.
- **Loading State:** Integrates with the authentication context to display a loading state for asynchronous operations.
- **Customizable Submit:** Accepts a submitFunc for handling form submissions asynchronously.

### Usage

```tsx
<Form
  submitFunc={loginAction} // Function to handle form submission
  inputList={[
    {
      id: "email",
      type: "email",
      place_holder: "E-mail",
      validations: {
        required: { value: true, message: "Email is required" },
        pattern: {
          value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
          message: "Invalid email format",
        },
      },
    },
    {
      id: "password",
      type: "password",
      place_holder: "Password",
      validations: {
        required: { value: true, message: "Password is required" },
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters long",
        },
      },
    },
  ]}
  label={"Login"}
/>
```

### Parameters

- submitFunc: A function executed on form submission, receiving form data as its argument.
- **inputList:** An array of input configurations:
  - **id:** The unique key identifying the field (matches your schema).
  - type: Input type (e.g., "email", "password", "text").
  - place_holder: Placeholder text for the input field.
  - validations: Validation rules using react-hook-form's RegisterOptions.
- **label:** Text displayed on the submit button.
