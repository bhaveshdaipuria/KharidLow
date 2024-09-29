const BACKEND = {
  PORT: 3000,
  API_URL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000"
      : "http://production-url.com",
};

export { BACKEND };
