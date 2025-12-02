# QUICKTERMS

QuickTerms is a simple React Native dictionary application built using Expo. It is designed for students, programmers, and anyone who needs a lightweight tool to store, organize, and search personal terms. The application allows users to build a customized “mini-dictionary” with editable categories, term management, and persistent storage.

## 1. Project Description

### Key Capabilities

- **Term Management**  
  Users can add, edit, and delete terms. Each term includes a title, definition, and category.

- **Category Management**  
  Users may create new categories or remove existing ones. Categories are fully customizable and saved using AsyncStorage.

- **Search System**  
  A real-time search bar allows fast filtering of terms.

- **Statistics**  
  A separate Statistics tab provides insights such as total terms, categories, most and least used, etc.

- **Persistent Storage**  
  Terms and categories are stored locally on the device using AsyncStorage so data is retained between sessions.

- **Clean Navigation Structure**  
  Implemented with React Navigation using bottom tabs and stack navigation.

- **Modern UI Features**  
  Includes a custom header, modal category selector, and clean layout across screens.

## 2. Installation and Running the Project

### Prerequisites

Ensure the following tools are installed on your system:

- Node.js  
- Expo CLI
  Run expo commands using: npx expo 
- Expo Go (on a physical device)  
- Optional: Android Studio or Xcode for emulator support  

### Cloning the Project

```bash
git clone https://github.com/zayanazil/QuickTermsExpo
cd QuickTermsExpo
```

### Install Dependancies

To ensure the correct versions of React Native + Expo Modules are installed, follow this order:

#### 1.Remove any cached modules (Optional but recommended)

```bash
rm -rf node_modules package-lock.json .expo .expo-shared
```

#### 2. Install dependancies

```bash
npm install
```

#### 3. Validate and auto-fix Expo dependancy versions

```bash
npx expo install --fix
```

### Running app
```bash
npx expo start
```

### IF app fails to load

Run Expo with cache clearing:

```bash
npx expo start -c
```

Scan the generated QR code using the Expo Go app to launch the project on a mobile device.

## 3. Features

### Term Management
- Create terms with a title, definition, and category.
- Edit existing terms.
- Delete terms when no longer needed.

### Category System
- Add custom categories.
- Remove categories with built-in safety checks.
- Persistent category storage via AsyncStorage.
- Category selection using a dedicated modal component.

### Statistics Tab
- Total number of terms.
- Total categories.
- Terms per category.
- Most & least used categories.
- Average definition length.
- Most recently added item.

### Search Functionality
- Real-time data filtering of terms using the search bar.

### AsyncStorage
- Stores all data locally:
 - "terms.Storage.js" for terms
 - "categoriesStorage.js" for categories
Data persists past the app being closed and reopened.

### Navigation
- Stack Navigator for all screens.
- Bottom Tab Navigator for Home, Settings, Statistics and Categories.
- Custom global header component.

## 4. Screenshots

### Home Screen (Displays all terms)
<img width="282" height="611" alt="image" src="https://github.com/user-attachments/assets/5432baaa-6f26-48eb-bab9-57965a3c734a" />

### Add Term Screen 
<img width="282" height="611" alt="image" src="https://github.com/user-attachments/assets/259fc3ac-9472-40b1-9cb1-70d284dd005c" />

### Term Detail Screen
<img width="282" height="611" alt="image" src="https://github.com/user-attachments/assets/d0badd6d-65e7-4c57-beb0-4c2b01bb6c89" />

### Edit Term Detail Screen
<img width="282" height="611" alt="image" src="https://github.com/user-attachments/assets/775371d2-affb-4954-aa53-9107809f2cf9" />

### Categories Screen
<img width="282" height="611" alt="image" src="https://github.com/user-attachments/assets/998b7f57-69d8-4457-8ca8-257f460e603b" />

### Category Detail Screen
<img width="282" height="611" alt="image" src="https://github.com/user-attachments/assets/de3b4aae-91e2-4d23-b87e-7222ed7fd314" />

### Settings Screen
<img width="282" height="611" alt="image" src="https://github.com/user-attachments/assets/ba0b80a6-2544-43bb-8ca0-60cbf62ef1ca" />

## 5. Folder Structure
```bash
QuickTermsExpo/
│
├── App.js
│
└── src/
    ├── assets/
    │   ├── adaptive-icon.png
    │   ├── favicon.png
    │   ├── icon.png
    │   └── notes.png
    │
    ├── components/
    │   ├── AppHeader.js
    │   ├── CategoryBadge.js
    │   ├── CategorySelect.js
    │   ├── SearchBar.js
    │   └── TermCard.js
    │
    ├── context/
    │   ├── TermsContext.js
    │   └── CategoriesContext.js
    │
    ├── navigation/
    │   └── BottomTabs.js
    │
    ├── screens/
    │   ├── AddTermScreen.js
    │   ├── CategoriesScreen.js
    │   ├── CategoryDetailScreen.js
    │   ├── EditTermScreen.js
    │   ├── HomeScreen.js
    │   ├── SettingsScreen.js
    │   ├── StatisticsScreen.js
    │   └── TermDetailScreen.js
    │
    ├── storage/
    │   ├── categoriesStorage.js
    │   └── termsStorage.js
    │
    └── utils/
        ├── categories.js
        └── generateID.js
```

## 6. Technologies Used
- React Native (Expo SDK 54)
- Expo Go
- Stack Navigator
- Bottom Tabs
- AsyncStorage
- JavaScript

## 7. Known Issues
- Categories cannot be renamed.
- No backup feature.
- No cloud synchronization.
