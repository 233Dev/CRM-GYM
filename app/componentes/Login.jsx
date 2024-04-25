import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

/*
  Stages:
  0: initiated
  1: loading
  2: login completed
  3: login but no username
  4: not logged
*/
async function handleOnClick() {
  const googleProvider = new GoogleAuthProvider();
  await singInWithGoogle(googleProvider);
  async function singInWithGoogle(googleProvider) {
    try {
      const res = await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  }
}

export default function Login({ signInWithGoogle }) {
  
  function handleOnClick() {
    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };
    signInWithGoogle();
  }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"> 
      <div className="space-y-6">
        {/* Campo de correo electrónico */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-100">   
            Email
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Campo de contraseña */}
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-100">
              Contraseña
            </label>
            <div className="text-sm">
              {/* Enlace para restablecer la contraseña */}
              <div className="cursor-pointer font-semibold text-sky-500 hover:text-sky-300">
                ¿Olvidaste tu contraseña?
              </div>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Botón de inicio de sesión */}
        <div>
          <button className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-600 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 focus:ring-offset-white focus:ring-2 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500">
            Iniciar sesión
          </button>
        </div>
      </div>
      {/* Botón para iniciar sesión con Google */}
      <div>
        <button onClick={signInWithGoogle} className="mt-2 flex w-full justify-center rounded-md bg-red-600 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus:ring-offset-white focus:ring-2 focus:outline-none focus:ring-offset-2 focus:ring-red-500">
          Iniciar con Google
        </button>
      </div>

      {/* Enlace para registrarse */}
      <p className="mt-10 text-center text-sm text-gray-100">
        ¿No eres miembro?{' '}
        <button className="font-semibold leading-6 text-sky-500 hover:text-sky-300">
          ¡Regístrate!
        </button>
      </p>
    </div>
  );
}