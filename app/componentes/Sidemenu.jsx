export default function  Layout() {
    return (
      <div className=" w-2/12 flex h-screen flex-col md:flex-row md:overflow-hidden bg-green-400">
        <div className="w-full flex-none md:w-64">
          Side menu, aún se estableceran las opciones que se mostrarán
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12"></div>
      </div>
    );
} 