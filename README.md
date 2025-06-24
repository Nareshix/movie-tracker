website_url = 'localhost:5173/verify-email';
in +page.server.ts to actual website (auth)/signup

need hash tokens in signup/page.server.ts line 39

in case user ask reset email mulitple times the data still lives in db for 5 mins take note