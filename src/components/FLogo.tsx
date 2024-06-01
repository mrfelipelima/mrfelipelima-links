import { SVGProps } from "react"

export function FLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={48}
      height={48}
      fill="none"
      {...props}
    >
      <circle cx={24} cy={24} r={24} fill="#0D0126" />
      <path
        fill="#F20530"
        d="M17.533 46.943 9.38 3.598 38.081.276l.816 7.25-19.733 1.962 1.305 8.609 14.188-1.057v5.286l-14.188.906L23.893 48c-2.826-.17-3.75-.302-6.36-1.057Z"
      />
    </svg>
  )
}
