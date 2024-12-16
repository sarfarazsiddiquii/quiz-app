# Quiz Application

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Running the Frontend

First, run the development server for the frontend:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Running the Backend

To run the backend server, navigate to the `quiz_backend` directory and start the Django development server:

```bash
cd quiz_backend
python manage.py runserver
```

The backend server will be available at [http://127.0.0.1:8000](http://127.0.0.1:8000).

You can add or edit questions using the Django admin panel by creating a superuser:

```bash
python manage.py createsuperuser
```

Then, navigate to [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin) and log in with your superuser credentials.

## Output

The application consists of three main pages:

1. Homepage
![image](https://github.com/user-attachments/assets/0642ccee-69df-416e-a45b-a54ced500ead)

2. Quiz
![image](https://github.com/user-attachments/assets/8d937840-6b1b-4013-94ca-a42dc2d844c2)

3. Result
![image](https://github.com/user-attachments/assets/a6989d0d-badd-4660-beda-1a11c57418af)



