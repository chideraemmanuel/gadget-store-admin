# Gadget Store Admin Dashboard

Gadget Store is a fake e-commerce site built for demonstration purposes. It allows administrators of the [Gadget Store E-commerce Website](https://github.com/chideraemmanuel/gadget-store-ecommerce) to manage products, orders, and user data.

## Overview

This repository contains the code for the Gadget Store Admin Dashboard. It interacts with two other components of the project:

- [Gadget Store API](https://github.com/chideraemmanuel/gadget-store-api): Responsible for handling product and order data retrieval, and admin session management.
- [Gadget Store Frontend](https://github.com/chideraemmanuel/gadget-store-ecommerce): The frontend part of the application that showcases basic e-commerce functionalities such as product listing, user authentication, shopping cart, and checkout.

This document is intended to provide an overview of the project, the technologies used, and brief explanations of the major features of the application.

## Techologies Used

- **Next.js**: Next.js is a React framework that enables server-side rendering and static site generation, providing a hybrid model that optimizes for performance, SEO, and flexibility among other things!
- **Typescript**: TypeScript is a statically typed superset of JavaScript that helps catch errors early through type-checking, leading to more robust and maintainable code.
- **TailwindCSS**: A utility-first CSS framework that allows for rapid UI development with a highly customizable design system.
- **React Query**: A powerful data-fetching library that simplifies server state management in React applications. It handles data fetching, caching, synchronization, and updates seamlessly, providing an optimized and declarative approach to working with server state and API interactions.
- **React Hook Forms**: A performant, flexible library for building forms in React using hooks. It minimizes re-renders, simplifies form validation, and provides an easy-to-use API for managing form state.

## Features

The web application includes all the basic features of a typical e-commerce admin dashboard, such as;

- **Products Management**: Admins can intuitively add, update and delete products from the database. The process also involves managing other parts like product categories, brands and more!
- **Orders Management**: Admins can also manage users' orders, and easily update order the status when needed.

## Installation and Usage

1. Clone the repository

```bash
git clone https://github.com/chideraemmanuel/gadget-store-admin.git
```

2. Install dependencies

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

### Environment variables

- **NEXT_PUBLIC_API_BASE_URL**: The base URL for the backend API
- **NEXT_PUBLIC_API_PROTOCOL**: The HTTP protocol for the backend API
- **NEXT_PUBLIC_API_HOST_NAME**: The host name of the backend API
- **NEXT_PUBLIC_API_PORT**: The port on which the backend API runs
- **NEXT_PUBLIC_PROJECT_BASE_URL**: The URL for this project
