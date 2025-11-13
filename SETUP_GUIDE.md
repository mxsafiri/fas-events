# Fas Exclusive Events Website - Setup Guide

## 🎉 Welcome to Your New Event Planning Website!

This is a modern, interactive single-page website built with Next.js, featuring:
- ✨ Smooth scroll animations
- 🎨 Interactive event builder wizard
- 📸 Event carousel showcase
- 📱 Mobile-first responsive design
- 🎯 Direct WhatsApp integration

## 📁 Adding Your Images & Videos

### Event Photos for Carousel

1. Create a folder: `public/events/`
2. Add your event photos with these names:
   - `event1.jpg` - First event
   - `event2.jpg` - Second event
   - `event3.jpg` - Third event
   - `event4.jpg` - Fourth event
   - `event5.jpg` - Fifth event

### Recommended Image Sizes:
- **Event Carousel**: 1920x1080px (landscape)
- **Hero Background**: 1920x1080px (full-screen)
- Format: JPG or PNG
- Optimize images to keep file size under 500KB for fast loading

## 🎨 Customization

### Update Contact Information

Edit these files to add your real contact details:

1. **Footer** (`src/components/Footer.tsx`):
   - Line 45: Phone number
   - Line 49: Email address

2. **Navbar** (`src/components/Navbar.tsx`):
   - Line 61: Phone number in "Book Now" button

3. **Event Wizard** (`src/components/EventWizard.tsx`):
   - Line 69: WhatsApp number for event requests

4. **Homepage** (`src/app/page.tsx`):
   - Line 192: WhatsApp link
   - Line 202: Phone call link

### Change Colors

The website uses a purple-pink gradient theme. To change colors:

1. Open `tailwind.config.ts`
2. Modify the color values
3. Current theme: Purple (#9333ea) to Pink (#ec4899)

## 🚀 Running the Website

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit: http://localhost:3000

## 📱 Features

### 1. Hero Section
- Animated gradient background
- "Build Your Event" wizard button
- Scroll indicator

### 2. Event Builder Wizard
- 4-step interactive form
- Event type selection
- Service selection
- Guest count & date
- Budget selection
- Sends request via WhatsApp

### 3. Event Journey
- Visual step-by-step process
- Animated icons
- Planning → Catering → Décor → Execution

### 4. Event Carousel
- Auto-rotating showcase
- Swipe/drag navigation
- 5 event slots
- Add your photos in `public/events/`

### 5. Call-to-Action
- WhatsApp direct link
- Phone call button
- Animated background

## 🎯 Next Steps

1. ✅ Add your event photos to `public/events/`
2. ✅ Update contact information (phone, email, WhatsApp)
3. ✅ Customize event types in the wizard
4. ✅ Add your logo to `public/` folder
5. ✅ Test on mobile devices
6. ✅ Deploy to Vercel or Netlify

## 📞 Support

Need help? Contact the developer or check Next.js documentation:
- https://nextjs.org/docs
- https://www.framer.com/motion/

## 🌟 Tips for Best Results

- Use high-quality, professional event photos
- Keep text concise and impactful
- Test the wizard flow thoroughly
- Ensure WhatsApp number is correct (include country code)
- Optimize images before uploading

---

Built with ❤️ using Next.js, Framer Motion, and Tailwind CSS
