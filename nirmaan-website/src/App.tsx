import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import { Home } from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import CreatePost from './_root/pages/CreatePost';

import './global.css';

const App = () => {

  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>
        {/* private routes */}
        <Route element={<RootLayout />}>
         <Route index element={<Home posts={[]} />} />
          <Route path="create-post" element={<CreatePost />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
