import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 px-4 border-t mt-auto">
      <p className="text-sm text-center text-muted-foreground">
        © {currentYear} Quiz App. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
