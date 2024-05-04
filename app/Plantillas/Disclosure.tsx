<Disclosure>
  {({ open }) => (
    /* Use the `open` state to conditionally change the direction of an icon. */
    <>
      <Disclosure.Button>
      Posición Inicial
        <ChevronRightIcon className={open ? 'rotate-90 transform' : ''} />
      </Disclosure.Button>
      <Disclosure.Panel>{ejercicio.posisiónInicial}</Disclosure.Panel>
    </>
  )}
</Disclosure> 