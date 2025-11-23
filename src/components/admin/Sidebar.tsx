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
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    direction: isRTL ? 'rtl' : 'ltr',
                }}
            >
                <StoreIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
                <Typography variant="h6" fontWeight="bold">
                    {t('adminPanel')}
                </Typography>
            </Box>

            {/* Menu Items */}
            <List sx={{ flex: 1, pt: 2, direction: isRTL ? 'rtl' : 'ltr' }}>
                {menuItems.map((item) => {
                    const isActive = pathname === item.path || pathname?.startsWith(item.path + '/');
                    return (
                        <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => handleNavigation(item.path)}
                                sx={{
                                    mx: 1,
                                    borderRadius: 2,
                                    bgcolor: isActive ? theme.palette.primary.main : 'transparent',
                                    color: isActive ? 'white' : 'inherit',
                                    flexDirection: isRTL ? 'row-reverse' : 'row',
                                    '&:hover': {
                                        bgcolor: isActive ? theme.palette.primary.dark : theme.palette.action.hover,
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: isActive ? 'white' : 'inherit',
                                        minWidth: 40,
                                        [isRTL ? 'mr' : 'ml']: 0,
                                        [isRTL ? 'ml' : 'mr']: 2,
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{ textAlign: isRTL ? 'right' : 'left' }}
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
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        direction: isRTL ? 'rtl' : 'ltr',
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        </>
    );
};

export default Sidebar;

