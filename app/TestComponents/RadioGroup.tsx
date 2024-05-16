import { Radio, RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

const plans = [
  { name: 'Startup', ram: 'poseidon_2298934.png', link: "https://headlessui.com/react/radio-group"},
  { name: 'Business', ram: 'zeus_2298883.png', link: "https://www.youtube.com/watch?v=_L2vJEb6lVE&list=RDtvTRZJ-4EyI&index=27"},
  { name: 'Enterprise', ram: 'poseidon_2298934.png', link: "https://github.com/233Dev/CRM-GYM"},
]

export default function Example() {
  const [selected, setSelected] = useState(plans[0])

  return (
    <div className="w-full px-4">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup by="name" value={selected} onChange={setSelected} aria-label="Server size" className="space-y-2">
          {plans.map((plan) => (
            <Radio
              key={plan.name}
              value={plan}
              className="group relative flex cursor-pointer rounded-lg bg-lime-500 py-4 px-5 text-white shadow-md transition focus:outline-none data-[focus]:outline-1
              data-[focus]:outline-white  data-[checked]:bg-green-400  "
            >
              <a href={plan.link}><img className='h-12 w-12' src={plan.ram} alt="" /></a>
                <CheckCircleIcon className="size-6 fill-white opacity-0 transition group-data-[checked]:opacity-100" />
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}