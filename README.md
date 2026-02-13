# Dynamic Form Builder System

A comprehensive form builder system built with Next.js, TypeScript, Material-UI, and Zustand for state management.

## 🚀 Features

- **Form Creator**: Design dynamic forms with various field types
- **Form Renderer**: Render forms from JSON schema
- **Data Viewer**: View and manage form submissions
- **Draft Support**: Save incomplete forms as drafts
- **Responsive Design**: Clean, professional MUI-based interface
- **Type Safety**: Full TypeScript support
- **State Management**: Efficient state handling with Zustand
- **Form Versioning**: Maintain compatibility across form versions

## 📋 Table of Contents

- [Installation](#installation)
- [Architecture](#architecture)
- [Features](#features-in-detail)
- [Usage](#usage)
- [Sample JSON Schema](#sample-json-schema)
- [Technologies Used](#technologies-used)

## 🛠️ Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/aliz-riaz/dynamic-form-builder
cd dynamic-form-builder
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open browser**
```
http://localhost:3000
```

## 🏗️ Architecture

### Project Structure
```
dynamic-form-builder/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── forms/             # Form creator pages
│   │   │   ├── page.tsx       # Forms list
│   │   │   ├── create/        # Create new form
│   │   │   └── edit/[id]/     # Edit existing form
│   │   ├── render/            # Form renderer
│   │   │   └── page.tsx       # Render selected form
│   │   ├── data/              # Data viewer
│   │   │   ├── page.tsx       # Submissions list
│   │   │   ├── view/[id]/     # View submission
│   │   │   └── edit/[id]/     # Edit submission
│   │   ├── layout.tsx         # Root layout with MUI theme
│   │   ├── page.tsx           # Home page
│   │   └── theme.tsx          # MUI theme configuration
│   ├── components/
│   │   ├── FormBuilder/       # Form creation components
│   │   │   ├── FormBuilder.tsx
│   │   │   └── FieldEditor.tsx
│   │   ├── FormRenderer/      # Form rendering component
│   │   │   └── FormRenderer.tsx
│   │   └── DataViewer/        # Data viewing components
│   ├── stores/                # Zustand state management
│   │   ├── formStore.ts       # Forms state
│   │   └── dataStore.ts       # Submissions/drafts state
│   ├── types/                 # TypeScript type definitions
│   │   └── form.types.ts
│   └── utils/                 # Utility functions
├── public/                    # Static assets
├── package.json
├── tsconfig.json
└── README.md
```

### State Management

The application uses **Zustand** with persistence middleware for state management:

#### Form Store (`formStore.ts`)
- Manages form schemas
- CRUD operations for forms
- Form versioning

#### Data Store (`dataStore.ts`)
- Manages form submissions
- Handles draft saves
- Supports data editing

### Data Flow
```
User Action → Component → Zustand Store → LocalStorage Persistence
                ↓
          Re-render with new state
```

## 🎯 Features in Detail

### 1. Form Creator

**Supported Field Types:**
- Text, Email, Password
- TextArea
- Date, DateTime
- Dropdown (Select)
- Checkbox Group
- Radio Group
- Toggle Switch

**Field Configuration:**
- Label and name
- Placeholder text
- Required flag
- Default values
- Validation rules (min/max length)
- Column span (1-4 columns)
- Options for select/radio/checkbox

**Layout Features:**
- 4-column responsive grid system
- Field reordering
- Section grouping
- Custom validation rules

### 2. Form Renderer

**Features:**
- Dynamic form generation from JSON
- Real-time validation
- Error handling and display
- Submit with loading state
- Draft save functionality
- Clear form option

**Validation:**
- Required fields
- Email format
- Min/max length
- Custom patterns

### 3. Data Viewer

**Features:**
- Tabbed interface (Submissions / Drafts)
- Detailed submission view
- Edit existing submissions
- Delete submissions
- Form version compatibility

## 📖 Usage

### Creating a Form

1. Navigate to **Forms** page
2. Click **"Create New Form"**
3. Add form title and description
4. Add sections
5. Add fields to sections
6. Configure field properties
7. Save the form

### Rendering a Form

1. Navigate to **Render** page
2. Select a form from dropdown
3. Fill in the form
4. Choose one of:
   - **Submit**: Save as completed submission
   - **Save Draft**: Save incomplete form
   - **Clear**: Reset all fields

### Viewing Data

1. Navigate to **Data** page
2. Switch between **Submissions** and **Drafts** tabs
3. Actions available:
   - **View**: See submission details
   - **Edit**: Modify submission data
   - **Delete**: Remove submission

## 📄 Sample JSON Schema
```json
{
  "id": "user-registration-form",
  "version": "1.0",
  "title": "User Registration Form",
  "description": "Complete registration form with validation",
  "sections": [
    {
      "id": "personal-info",
      "title": "Personal Information",
      "description": "Please provide your basic details",
      "fields": [
        {
          "id": "full-name",
          "type": "text",
          "label": "Full Name",
          "name": "fullName",
          "placeholder": "Enter your full name",
          "required": true,
          "columnSpan": 2,
          "validation": {
            "minLength": 3,
            "maxLength": 50
          }
        },
        {
          "id": "email",
          "type": "email",
          "label": "Email Address",
          "name": "email",
          "placeholder": "your@email.com",
          "required": true,
          "columnSpan": 2
        },
        {
          "id": "phone",
          "type": "text",
          "label": "Phone Number",
          "name": "phone",
          "placeholder": "+92 300 1234567",
          "required": false,
          "columnSpan": 2
        },
        {
          "id": "dob",
          "type": "date",
          "label": "Date of Birth",
          "name": "dateOfBirth",
          "required": true,
          "columnSpan": 2
        }
      ]
    },
    {
      "id": "address-section",
      "title": "Address Information",
      "fields": [
        {
          "id": "country",
          "type": "dropdown",
          "label": "Country",
          "name": "country",
          "required": true,
          "columnSpan": 2,
          "options": [
            { "label": "Pakistan", "value": "pakistan" },
            { "label": "India", "value": "india" },
            { "label": "Bangladesh", "value": "bangladesh" }
          ]
        },
        {
          "id": "city",
          "type": "text",
          "label": "City",
          "name": "city",
          "required": true,
          "columnSpan": 2
        },
        {
          "id": "address",
          "type": "textarea",
          "label": "Full Address",
          "name": "address",
          "placeholder": "Enter your complete address",
          "required": true,
          "columnSpan": 4
        }
      ]
    },
    {
      "id": "preferences",
      "title": "Preferences",
      "fields": [
        {
          "id": "interests",
          "type": "checkbox",
          "label": "Interests",
          "name": "interests",
          "columnSpan": 4,
          "options": [
            { "label": "Technology", "value": "technology" },
            { "label": "Sports", "value": "sports" },
            { "label": "Music", "value": "music" },
            { "label": "Travel", "value": "travel" }
          ]
        },
        {
          "id": "newsletter",
          "type": "toggle",
          "label": "Subscribe to Newsletter",
          "name": "newsletter",
          "defaultValue": false,
          "columnSpan": 2
        }
      ]
    }
  ],
  "createdAt": "2025-02-13T10:00:00.000Z",
  "updatedAt": "2025-02-13T10:00:00.000Z"
}
```

## 🛠️ Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Material-UI (MUI)**: UI component library
- **Zustand**: Lightweight state management
- **React Hook Form**: Form validation
- **Day.js**: Date handling
- **UUID**: Unique ID generation

## 🎨 Design Decisions

### Why Zustand?
- Lightweight (< 1KB)
- Simple API
- Built-in persistence
- No boilerplate code

### Why MUI?
- Professional components
- Responsive by default
- Extensive customization
- Active community

### Why TypeScript?
- Type safety
- Better IDE support
- Catch errors early
- Improved code documentation

## 🚧 Edge Cases Handled

1. **Form Versioning**: Old submissions work with updated forms
2. **Field Dependencies**: Conditional field rendering
3. **Validation**: Comprehensive client-side validation
4. **Draft Management**: Auto-save and resume capability
5. **Error Handling**: User-friendly error messages
6. **Empty States**: Helpful messages when no data

## 📝 Future Enhancements

- [ ] Drag-and-drop field reordering
- [ ] Conditional field logic
- [ ] File upload support
- [ ] Export data to CSV/Excel
- [ ] Form templates
- [ ] Multi-language support
- [ ] Advanced analytics

## 👤 Author

Your Name  
GitHub: (https://github.com/aliz-riaz)

## 📄 License

This project is open source and available under the MIT License.