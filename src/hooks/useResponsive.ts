import { useTheme, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';

/**
 * Custom hook for responsive design utilities
 */
export const useResponsive = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const currentBreakpoint = useMemo(() => {
    if (isMobile) return 'xs';
    if (isTablet) return 'sm';
    if (isDesktop && !isLargeScreen) return 'md';
    if (isLargeScreen) return 'lg';
    return 'xl';
  }, [isMobile, isTablet, isDesktop, isLargeScreen]);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeScreen,
    currentBreakpoint,
  };
};
