import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Stack,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  Storefront,
  Security,
  LocalShipping,
  Support,
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();

  const socialLinks = [
    { icon: <Facebook />, href: '#', label: 'Facebook' },
    { icon: <Twitter />, href: '#', label: 'Twitter' },
    { icon: <Instagram />, href: '#', label: 'Instagram' },
    { icon: <LinkedIn />, href: '#', label: 'LinkedIn' },
  ];

  const quickLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Products', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: 'Contact', href: '/contact' },
  ];

  const customerService = [
    { label: 'Help Center', href: '/help' },
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'Size Guide', href: '/size-guide' },
  ];

  const legal = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Refund Policy', href: '/refund' },
  ];

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        color: 'white',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(12, 1fr)',
            },
            gap: 4,
          }}
        >
          {/* Company Info */}
          <Box
            sx={{
              gridColumn: { xs: '1', sm: '1 / -1', md: 'span 4' },
            }}
          >
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Storefront sx={{ fontSize: 32, color: theme.palette.primary.light }} />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Premium Store
                </Typography>
              </Box>
              <Typography variant="body1" color="rgba(255,255,255,0.8)" sx={{ lineHeight: 1.6 }}>
                Your trusted destination for premium products. We deliver quality, style, and
                exceptional customer service to enhance your shopping experience.
              </Typography>

              {/* Contact Info */}
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email sx={{ fontSize: 20, color: theme.palette.primary.light }} />
                  <Typography variant="body2" color="rgba(255,255,255,0.8)">
                    support@premiumstore.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone sx={{ fontSize: 20, color: theme.palette.primary.light }} />
                  <Typography variant="body2" color="rgba(255,255,255,0.8)">
                    +1 (555) 123-4567
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ fontSize: 20, color: theme.palette.primary.light }} />
                  <Typography variant="body2" color="rgba(255,255,255,0.8)">
                    123 Commerce St, Business City, BC 12345
                  </Typography>
                </Box>
              </Stack>

              {/* Social Links */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Follow Us
                </Typography>
                <Stack direction="row" spacing={1}>
                  {socialLinks.map((social, index) => (
                    <IconButton
                      key={index}
                      href={social.href}
                      sx={{
                        color: 'rgba(255,255,255,0.7)',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        '&:hover': {
                          backgroundColor: theme.palette.primary.main,
                          color: 'white',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Box>

          {/* Quick Links */}
          <Box
            sx={{
              gridColumn: { xs: '1', sm: '1', md: 'span 2' },
            }}
          >
            <Stack spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Quick Links
              </Typography>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  color="rgba(255,255,255,0.8)"
                  sx={{
                    textDecoration: 'none',
                    '&:hover': {
                      color: theme.palette.primary.light,
                      textDecoration: 'underline',
                    },
                    transition: 'color 0.3s ease',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Box>

          {/* Customer Service */}
          <Box
            sx={{
              gridColumn: { xs: '1', sm: '2', md: 'span 2' },
            }}
          >
            <Stack spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Customer Service
              </Typography>
              {customerService.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  color="rgba(255,255,255,0.8)"
                  sx={{
                    textDecoration: 'none',
                    '&:hover': {
                      color: theme.palette.primary.light,
                      textDecoration: 'underline',
                    },
                    transition: 'color 0.3s ease',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Box>

          {/* Legal */}
          <Box
            sx={{
              gridColumn: { xs: '1', sm: '1', md: 'span 2' },
            }}
          >
            <Stack spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Legal
              </Typography>
              {legal.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  color="rgba(255,255,255,0.8)"
                  sx={{
                    textDecoration: 'none',
                    '&:hover': {
                      color: theme.palette.primary.light,
                      textDecoration: 'underline',
                    },
                    transition: 'color 0.3s ease',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Box>

          {/* Features */}
          <Box
            sx={{
              gridColumn: { xs: '1', sm: '2', md: 'span 2' },
            }}
          >
            <Stack spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Why Choose Us
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Security sx={{ fontSize: 16, color: theme.palette.primary.light }} />
                  <Typography variant="body2" color="rgba(255,255,255,0.8)">
                    Secure Payment
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalShipping sx={{ fontSize: 16, color: theme.palette.primary.light }} />
                  <Typography variant="body2" color="rgba(255,255,255,0.8)">
                    Free Shipping
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Support sx={{ fontSize: 16, color: theme.palette.primary.light }} />
                  <Typography variant="body2" color="rgba(255,255,255,0.8)">
                    24/7 Support
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="rgba(255,255,255,0.7)">
            © {new Date().getFullYear()} Premium Store. All rights reserved.
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.7)">
            Made with ❤️ for our customers
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;