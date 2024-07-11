import { LaptopIcon } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface Props {}

const Logo: FC<Props> = () => {
  return (
    <Link href={'/'} className="inline-flex items-center justify-center gap-1">
      {/* <LaptopIcon className="text-foreground" /> */}
      <svg
        className="text-foreground w-7 h-7"
        // fill="#000000"
        fill="currentColor"
        height="800px"
        width="800px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
      >
        <g>
          <g>
            <g>
              <path
                d="M111.189,460.8h-0.094c-4.702,0-8.482,3.823-8.482,8.533s3.857,8.533,8.576,8.533c4.71,0,8.533-3.823,8.533-8.533
				S115.9,460.8,111.189,460.8z"
              />
              <path
                d="M247.467,477.867h17.067c4.719,0,8.533-3.823,8.533-8.533s-3.814-8.533-8.533-8.533h-17.067
				c-4.719,0-8.533,3.823-8.533,8.533S242.748,477.867,247.467,477.867z"
              />
              <path
                d="M366.933,375.467H247.467c-4.719,0-8.533,3.823-8.533,8.533s3.814,8.533,8.533,8.533h119.467
				c4.719,0,8.533-3.823,8.533-8.533S371.652,375.467,366.933,375.467z"
              />
              <path
                d="M196.267,221.867H25.6c-14.114,0-25.6,11.486-25.6,25.6V486.4C0,500.514,11.486,512,25.6,512h170.667
				c14.114,0,25.6-11.486,25.6-25.6V247.467C221.867,233.353,210.381,221.867,196.267,221.867z M204.8,486.4
				c0,4.702-3.823,8.533-8.533,8.533H25.6c-4.71,0-8.533-3.831-8.533-8.533V247.467c0-4.702,3.823-8.533,8.533-8.533h170.667
				c4.71,0,8.533,3.831,8.533,8.533V486.4z"
              />
              <path
                d="M332.8,460.8h-25.6v-42.667c0-4.71-3.814-8.533-8.533-8.533s-8.533,3.823-8.533,8.533v51.2
				c0,4.71,3.814,8.533,8.533,8.533H332.8c16.051,0,22.059,9.481,24.294,17.067H247.467c-4.719,0-8.533,3.823-8.533,8.533
				s3.814,8.533,8.533,8.533h119.467c4.719,0,8.533-3.823,8.533-8.533C375.467,488.713,366.549,460.8,332.8,460.8z"
              />
              <path
                d="M256,358.4c9.412,0,17.067-7.654,17.067-17.067c0-9.412-7.654-17.067-17.067-17.067c-9.404,0-17.067,7.654-17.067,17.067
				C238.933,350.746,246.596,358.4,256,358.4z"
              />
              <path
                d="M486.4,290.133h-68.267c-14.114,0-25.6,11.486-25.6,25.6V486.4c0,14.114,11.486,25.6,25.6,25.6H486.4
				c14.114,0,25.6-11.486,25.6-25.6V315.733C512,301.619,500.514,290.133,486.4,290.133z M494.933,486.4
				c0,4.702-3.823,8.533-8.533,8.533h-68.267c-4.71,0-8.533-3.831-8.533-8.533V315.733c0-4.702,3.823-8.533,8.533-8.533H486.4
				c4.71,0,8.533,3.831,8.533,8.533V486.4z"
              />
              <path
                d="M469.333,0H42.667C19.14,0,0,19.14,0,42.667v153.6c0,4.71,3.814,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-153.6
				c0-14.114,11.486-25.6,25.6-25.6h426.667c14.114,0,25.6,11.486,25.6,25.6v221.867c0,4.71,3.814,8.533,8.533,8.533
				c4.719,0,8.533-3.823,8.533-8.533V42.667C512,19.14,492.86,0,469.333,0z"
              />
              <path
                d="M452.523,460.8h-0.094c-4.702,0-8.482,3.823-8.482,8.533s3.857,8.533,8.576,8.533c4.71,0,8.533-3.823,8.533-8.533
				S457.233,460.8,452.523,460.8z"
              />
              <path
                d="M366.933,290.133H247.467c-4.719,0-8.533,3.823-8.533,8.533s3.814,8.533,8.533,8.533h119.467
				c4.719,0,8.533-3.823,8.533-8.533S371.652,290.133,366.933,290.133z"
              />
              <path
                d="M452.267,85.333c2.185,0,4.369-0.836,6.033-2.5c3.337-3.337,3.337-8.73,0-12.066L441.233,53.7
				c-3.337-3.337-8.73-3.337-12.066,0c-3.336,3.337-3.336,8.73,0,12.066l17.067,17.067
				C447.898,84.497,450.082,85.333,452.267,85.333z"
              />
              <path
                d="M452.267,136.533c2.185,0,4.369-0.836,6.033-2.5c3.337-3.337,3.337-8.73,0-12.066L390.033,53.7
				c-3.336-3.337-8.73-3.337-12.066,0c-3.336,3.337-3.336,8.73,0,12.066l68.267,68.267
				C447.898,135.697,450.082,136.533,452.267,136.533z"
              />
            </g>
          </g>
        </g>
      </svg>
      <span className="text-foreground font-medium">Gadget Store</span>
    </Link>
  );
};

export default Logo;
