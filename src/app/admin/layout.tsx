"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Box, AppBar, Toolbar, IconButton, Typography, useTheme, useMediaQuery, Alert, CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../../components/admin/Sidebar';
import { useTranslations, useLocale } from 'next-intl';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        if (isMobile) {
            setSidebarOpen(false);
        } else {
            setSidebarOpen(true);
        }
    }, [isMobile]);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);
    const t = useTranslations('admin');
    const locale = useLocale();
    const isRTL = locale === 'he';

    const handleDrawerToggle = () => {
        if (isMobile) {
            setMobileOpen(!mobileOpen);
        } else {
            setSidebarOpen(!sidebarOpen);
        }
    };

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (status === 'unauthenticated') {
                router.push('/auth/signin?error=AccessDenied&callbackUrl=/admin');
                return;
            }

            if (status === 'authenticated' && session) {
                try {
                    const response = await fetch('/api/admin/check');
                    const data = await response.json();
                    setIsAdmin(data.isAdmin);

                    if (!data.isAdmin) {
                        console.log('Admin check failed:', data);
                    }
                } catch (error) {
                    console.error('Error checking admin status:', error);
                    setIsAdmin(false);
                } finally {
                    setLoading(false);
                }
            }
        };

        checkAdminStatus();
    }, [status, session, router]);

    if (status === 'loading' || loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', gap: 2 }}>
                <CircularProgress />
                <Typography>{t('checkingPermissions')}</Typography>
            </Box>
        );
    }

    if (!session) {
        return null;
    }

    // Show error if not admin
    if (isAdmin === false) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 3 }}>
                <Alert severity="error" sx={{ maxWidth: 600 }}>
                    <Typography variant="h6" gutterBottom>
                        {t('noAccess')}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {t('noAccessMessage', { email: session.user?.email })}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        <strong>{t('configureEmail')}</strong>
                    </Typography>
                    <Typography variant="body2" component="pre" sx={{ mt: 1, p: 2, bgcolor: 'grey.100', borderRadius: 1, fontSize: '0.875rem' }}>
                        ADMIN_EMAILS={session.user?.email}
                    </Typography>
                </Alert>
            </Box>
        );
    }

    if (isAdmin === null) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    const marginSide = isRTL ? 'mr' : 'ml';
    const contentMargin = sidebarOpen ? '260px' : 0;

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5', direction: isRTL ? 'rtl' : 'ltr' }}>
            {/* AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    width: {
                        xs: '100%',
                        md: sidebarOpen ? `calc(100% - 260px)` : '100%'
                    },
                    [marginSide]: {
                        xs: 0,
                        md: sidebarOpen ? contentMargin : 0
                    },
                    transition: theme.transitions.create(['width', marginSide], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    bgcolor: 'white',
                    color: 'text.primary',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    direction: isRTL ? 'rtl' : 'ltr',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar sx={{
                    direction: isRTL ? 'rtl' : 'ltr',
                    px: { xs: 1, sm: 2 },
                }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge={isRTL ? 'start' : 'end'}
                        onClick={handleDrawerToggle}
                        sx={{
                            [isRTL ? 'mr' : 'ml']: { xs: 0, md: sidebarOpen ? 0 : 2 },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            textAlign: isRTL ? 'right' : 'left',
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                        }}
                    >
                        {t('managementInterface')}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            [isRTL ? 'ml' : 'mr']: { xs: 1, sm: 2 },
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        {session.user?.email}
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                mobileOpen={mobileOpen}
                onMobileClose={() => setMobileOpen(false)}
            />

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: {
                        xs: '100%',
                        md: sidebarOpen ? `calc(100% - 260px)` : '100%'
                    },
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    p: { xs: 2, sm: 3 },
                    mt: { xs: 7, sm: 8 },
                    direction: isRTL ? 'rtl' : 'ltr',
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

