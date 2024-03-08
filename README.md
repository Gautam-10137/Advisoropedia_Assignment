<h1>Advisoropedia Assignment - Full Stack</h1>
  <h2>Technology Stack</h2>
  <ul>
    <li>Node.js and npm</li>
    <li>Express.js</li>
    <li>MongoDB</li>
    <li>jsonwebtoken</li>
    <li>React.js</li>
  </ul>

  <h2>Project Overview</h2>
  <p>
    This project, named Advisoropedia, is a full-stack application that incorporates various technologies to deliver a robust user experience. Below is an overview of the key features and implementations within the project:
  </p>

  <h3>Signup Screen</h3>
  <ul>
    <li>Included fields for username,email, password (with confirmation).</li>
    <li>Implemented validation for the required fields and email format using React state management and validation libraries.</li>
    <li>Included terms and conditions checkbox.</li>
    <li>Displayed clear error messages and success messages.</li>
    <li>Redirect to the post list screen after successful signup using React Router.</li>
    <li>Simulate sending a welcome email notification upon successful signup.</li>
  </ul>

  <h3>Post List Screen</h3>
  <ul>
    <li>Developed a screen where the user can scroll infinitely, and posts will be rendered using GET API of posts.</li>
    <li>Implement responsive design using Tailwind.</li>
  </ul>

  <h3>API Endpoints</h3>
  <ul>
    <li><strong>POST /signup:</strong> Registers a new user with the provided username, email, and password. Validates input, ensures unique usernames and emails, hashes passwords securely, stores user data in the database, and returns a success message and JWT token upon successful registration.</li>
    <li><strong>GET /posts:</strong> Paginated implementation of fetching posts data from the database. Secure and non-authenticated APIs are being rejected.</li>
  </ul>

  <h3>JWT Implementation</h3>
  <ul>
    <li>Generated JWT tokens with appropriate payload and expiration time upon successful login.</li>
    <li>Validated JWT tokens in protected routes to ensure user authentication.</li>
  </ul>

  <h3>Best Practices & Bonus Points:</h3>
  <ul>
    <li>Added password visibility toggle.</li>
    <li>Used middleware for authentication and authorization.</li>
    <li>Securely stored passwords using strong hashing algorithms (bcrypt).</li>
    <li>Implemented proper error handling and provided informative error messages.</li>
    <li>Clean, well-structured, and documented code.</li>
    <li>Used environment variables for sensitive information.</li>
  </ul>


  