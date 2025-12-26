"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    useTheme,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Inventory as InventoryIcon,
    ShoppingCart as ShoppingCartIcon,
    People as PeopleIcon,
    Analytics as AnalyticsIcon,
    Store as StoreIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslations, useLocale } from 'next-intl';

const drawerWidth = 260;

interface SidebarProps {
    open: boolean;
    onClose: () => void;
    mobileOpen: boolean;
    onMobileClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, mobileOpen, onMobileClose }) => {
    const pathname = usePathname();
    const router = useRouter();
    const theme = useTheme();
    const { signOut } = useAuth();
    const t = useTranslations('admin');
    const locale = useLocale();

    const isRTL = locale === 'en';

    const menuItems = [
        { text: t('menu.dashboard'), icon: <DashboardIcon />, path: '/admin' },
        { text: t('menu.products'), icon: <InventoryIcon />, path: '/admin/products' },
        { text: t('menu.orders'), icon: <ShoppingCartIcon />, path: '/admin/orders' },
        { text: t('menu.users'), icon: <PeopleIcon />, path: '/admin/users' },
        { text: t('menu.analytics'), icon: <AnalyticsIcon />, path: '/admin/analytics' },
    ];

    const handleNavigation = (path: string) => {
        router.push(path);
        onMobileClose();
    };

    const handleSignOut = () => {
        signOut();
        router.push('/');
    };

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <Box
                sx={{
                    p: { xs: 2, sm: 3 },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    direction: isRTL ? 'rtl' : 'ltr',
                }}
            >
                <StoreIcon sx={{ fontSize: { xs: 28, sm: 32 }, color: theme.palette.primary.main }} />
                <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                    {t('adminPanel')}
                </Typography>
            </Box>

            {/* Menu Items */}
            <List sx={{ flex: 1, pt: { xs: 1, sm: 2 }, direction: isRTL ? 'rtl' : 'ltr' }}>
                {menuItems.map((item) => {
                    const isActive = pathname === item.path || pathname?.startsWith(item.path + '/');
                    return (
                        <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => handleNavigation(item.path)}
                                sx={{
                                    mx: { xs: 0.5, sm: 1 },
                                    borderRadius: 2,
                                    bgcolor: isActive ? theme.palette.primary.main : 'transparent',
                                    color: isActive ? 'white' : 'inherit',
                                    flexDirection: isRTL ? 'row-reverse' : 'row',
                                    py: { xs: 1, sm: 1.5 },
                                    '&:hover': {
                                        bgcolor: isActive ? theme.palette.primary.dark : theme.palette.action.hover,
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: isActive ? 'white' : 'inherit',
                                        minWidth: { xs: 36, sm: 40 },
                                        [isRTL ? 'mr' : 'ml']: 0,
                                        [isRTL ? 'ml' : 'mr']: { xs: 1, sm: 2 },
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{
                                        textAlign: isRTL ? 'right' : 'left',
                                        '& .MuiListItemText-primary': {
                                            fontSize: { xs: '0.875rem', sm: '1rem' },
                                        },
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            <Divider />

            {/* Sign Out */}
            <List sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={handleSignOut}
                        sx={{
                            mx: 1,
                            mt: 1,
                            borderRadius: 2,
                            color: theme.palette.error.main,
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                            '&:hover': {
                                bgcolor: theme.palette.error.light,
                                color: 'white',
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                color: 'inherit',
                                minWidth: 40,
                                [isRTL ? 'mr' : 'ml']: 0,
                                [isRTL ? 'ml' : 'mr']: 2,
                            }}
                        >
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={t('signOut')}
                            sx={{ textAlign: isRTL ? 'right' : 'left' }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    const anchor = isRTL ? 'left' : 'right';
    const borderSide = isRTL ? 'borderRight' : 'borderLeft';

    return (
        <>
            {/* Desktop Drawer */}
            <Drawer
                variant="persistent"
                anchor={anchor}
                open={open}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        direction: isRTL ? 'rtl' : 'ltr',
                        [borderSide]: `1px solid ${theme.palette.divider}`,
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                anchor={anchor}
                open={mobileOpen}
                onClose={onMobileClose}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: { xs: '80%', sm: drawerWidth },
                        maxWidth: drawerWidth,
                        boxSizing: 'border-box',
                        direction: isRTL ? 'rtl' : 'ltr',
                    },
                    '& .MuiBackdrop-root': {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        </>
    );
};

export default Sidebar;

