const GoogleMap = () => {
  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden border border-border">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3321.6447738!2d73.136197!3d33.627862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDM3JzQwLjMiTiA3M8KwMDgnMTguNiJF!5e0!3m2!1sen!2s!4v1699000000000!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="IQ Ceiling Designs Office Location - Islamabad"
      />
    </div>
  );
};

export default GoogleMap;
