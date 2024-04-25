
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

export default function DatosPersona() {
  return (
    <form>
      <div className=" bg-sky-100 space-y-12 m-1 p-4 border-2 border-sky-700 rounded-2xl">{/**Datos del Form */}

        <div className="border-b border-sky-900/10 pb-12">{/**Info personal */}
          <h2 className="text-base font-semibold leading-7 text-gray-900">Informacion Personal</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="Nombre" className="block text-sm font-medium leading-6 text-gray-900">
                Nombre
              </label>
              <div className="mt-2">
                <input
                  type="text" pattern='[A-Za-zÁÉÍÓÚáéíóúñÑ\s]'
                  name="Nombre"
                  id="Nombre"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="Apellido" className="block text-sm font-medium leading-6 text-gray-900">
                Apellido
              </label>
              <div className="mt-2">
                <input
                  type="text" pattern='[A-Za-zÁÉÍÓÚáéíóúñÑ\s]'
                  name="Apellido"
                  id="Apellido"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Dirección email
              </label>
              <div className="mt-2">
                <input
                  id="email" pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+'
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="Genero" className="block text-sm font-medium leading-6 text-gray-900">
                Sexo 
              </label>
              <div className="mt-2">
                <select
                  id="Genero"
                  name="Genero"
                  autoComplete="Genero-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Mujer</option>
                  <option>Hombre</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="Objetivo" className="block text-sm font-medium leading-6 text-gray-900">
                ¿Cual es tu objetivo al inscribirte en este gimnacio?
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="Objetivo"
                  id="Objetivo"
                  autoComplete="Objetivo"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="Telefono" className="block text-sm font-medium leading-6 text-gray-900">
                Telefono
              </label>
              <div className="mt-2">
                <input
                  type="tel" pattern='\d{3}-\d{3}-\d{4}'
                  name="Telefono"
                  id="Telefono"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="Nacimiento" className="block text-sm font-medium leading-6 text-gray-900">
                Fecha de nacimiento
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="Nacimiento"
                  id="Nacimiento"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="#" className="block text-sm font-medium leading-6 text-gray-900">
                Algun otro dato
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="#"
                  id="#"
                  autoComplete="#"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-b border-sky-900/10 pb-12">{/**foto */}
          <h2 className="text-base font-semibold leading-7 text-gray-900">Imagen de Perfil</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>
            <div className="col-span-full">{/**Foto */}
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="col-span-full">{/**Area para dropear archivos */}
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">{/**submit / cancelar */}
        <button type="button" className="rounded-md px-3 py-2 text-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 font-semibold leading-6 text-white">
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
        >
          Guardar
        </button>
      </div>
    </form>
  )
}
