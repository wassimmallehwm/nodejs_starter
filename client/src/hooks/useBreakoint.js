import { useMediaQuery } from 'react-responsive';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

const Tailwind = resolveConfig(tailwindConfig);

const useBreakpoint = (breakpoint) => {
  return useMediaQuery({
    query: `(min-width: ${Tailwind.theme.screens[breakpoint]})`
  })
}

export default useBreakpoint;