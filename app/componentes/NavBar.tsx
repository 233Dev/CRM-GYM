"use client";
import React, { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import AuthProvider from "../AuthProvider";
import { useRouter } from 'next/navigation';

const navigation = [
  { name: 'Test de componente', href: '/TestComponents', current: false },
  { name: 'Home', href: '/Home', current: false },
  { name: 'Recepcionista', href: '/Recepcionista', current: false },
  { name: 'Entrenador', href: '/Entrenador', current: false },
  { name: 'Administrador', href: '/Admin', current: false }
];

export default function NavBar({user}) {
  const [currentUser, setCurrentUser] = useState();
  const router = useRouter();

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  function handleUserLoggedIn(user){
    setCurrentUser(user);
    console.log(currentUser);
  }
  function handleUserNotLoggedIn(){
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
        <div className="flex h-16 items-center justify-between bg-gray-900 mx-max px-2 sm:px-6 lg:px-8">
          <div>{/**Logo ppegado a la izquierda. */}
            <a href="/">
              <img
                className="relative overflow-hidden h-16 w-auto rounded-full"
                src="https://m.media-amazon.com/images/I/51SDRru7eaL._UXNaN_FMjpg_QL85_.jpg"
                alt="Your Company"
              />
            </a>
          </div>
          {!user? (<div className="p-2">
          <button  
            type="button"
            onClick={() => router.push('/login')}
            className="rounded-xl bg-sky-800 p-2 text-gray-300 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Login
          </button>
        </div>):(<>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">{/**Botones a los demás links. */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-sky-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">{/**Imagen de perfil y manú para el usuario. */}
              <Menu as="div" className="relative ml-3">
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src="" alt="" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Your Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
          </div></>)}
          
        </div>
    </AuthProvider>
  );
}


