import React from "react";


// footer
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full fixed bottom-0 left-0 right-0 border-0 py-6 -z-20 px-4">
    <p className="text-sm text-center text-muted-foreground">
      © {currentYear} Quiz App. All rights reserved.
    </p>
  </footer>
  );
};

export default Footer;
