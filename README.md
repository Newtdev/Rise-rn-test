 Note to the reviewer: The collaborator on this project (Propser) helped in pushing the source code because for one reason or the other I can not push to an empty git repository.

# Thought Process: Rise RN Test

## Initial Analysis

When I first approached this project, I considered the following key aspects:

1. App Functionality: This is an investment app with features for user authentication, plan creation.
2. User Flow: The app requires a logical flow from sign-in/sign-up to creating and managing investment plans.
3. Technology Stack: The specified stack includes modern React Native technologies with a focus on performance, customisation and maintainability.

## Architecture Considerations

### Component Structure
- Decision: Implement a modular component structure with a focus on reusability and simplicity, utilizing react-native-paper for UI components.
- Rationale: This will enhance reusability, maintainability, and readability of the codebase while providing a consistent and professional UI. 
- Approach:
  - Design each component to be as simple and focused as possible, adhering to the single responsibility principle.
  - Create a component of reusable UI elements (buttons, input fields, cards, etc.) that can be used across different screens.
  - Implement compound components for more complex UI patterns, allowing for flexible and reusable implementations.

### Project Structure
- Decision: Organize the project structure to maximize maintainability and readability.
- Rationale: A well-organized project structure is crucial for long-term maintenance and ease of onboarding new developers.
- Approach:
  - Use a feature-based folder structure to group related components, hooks, and utilities.
  - Implement consistent naming conventions across the project.
  - Create separate folders for reusable components, hooks, and utilities.
  - Keep a flat structure where possible to avoid deep nesting.

Example project structure:
```
app/
  ├── components/
  │   ├── common/
  ├── screens/
  |   ├── onboarding/
  │   ├── Auth/
  │   ├── Home/
  │   ├── CreatePlan/
  ├── hooks/
  ├── utils/
  ├── navigation/
  └── store/
      ├── store/
      └── globalslice/
```

### State Management
- Decision: Use a combination of React Hooks, React Query, and minimal Redux.
- Rationale: 
  - React Hooks for local state management within components.
  - React Query for server state management, which will be crucial for fetching and caching investment data.
  - Minimal Redux for any global state, keeping it lightweight.

### Navigation
- Decision: Utilize React Navigation 5 with a combination of stack and tab navigators.
- Rationale: This will allow for a smooth user experience, with authentication flows separate from the main app flow.

## Page-by-Page Thought Process

### Sign In / Sign Up
- Challenge: Ensuring secure and user-friendly authentication.
- Approach: 
  - Implement form validation using React Hook Form for efficiency.
  - Use a custom hook for authentication state, possibly integrating with Redux for global auth state.
  - Create reusable input components with built-in validation visualization.

### Homepage
- Challenge: Displaying relevant user information and easy access to key features.
- Approach:
  - Use React Query to fetch and cache user's investment summary.
  - Implement pull-to-refresh for updated data.
  - Design reusable card components for displaying various types of information.

### Create a Plan
- Challenge: Guiding users through plan creation with potentially complex options.
- Approach:
  - Break the process into steps using a multi-step form.
  - Implement client-side validation for immediate feedback.
  - Use React Query mutations for submitting plan data.
  - Create reusable form components that can be composed for different plan types.

## Technical Considerations

### TypeScript Integration
- Decision: Use TypeScript strictly throughout the project.
- Rationale: This will catch type-related errors early and improve code documentation.

### Error Handling
- Decision: Implement a global error boundary and consistent error handling patterns.
- Approach:
  - Create a custom error handling hook for API calls.
  - Use error boundaries to catch and display runtime errors gracefully.
  - Design a reusable error display component for consistent error messaging across the app.

### Animations
- Decision: Use react-native-reanimated for complex animations and react-native-navigation for navigation animations.
- Rationale: This will provide smooth animations throughout the app while keeping bundle size minimal and improving code readability.
Approach:

- Create a library of reusable animation hooks for common animation patterns.
- Utilize react-native-navigation's built-in animation capabilities for smooth transitions between screens.
- Centralize animation logic in dedicated files or hooks to improve code organization and readability.


## Performance Considerations

- Decision: Prioritize performance from the start.
- Approach:
  - Use React.memo and useMemo/useCallback hooks to optimize re-renders.
  - Implement virtualized lists for long scrollable content.
