# Stair-Step Tracker: Covered Call Strategy Engine

Welcome to the **Stair-Step Tracker**! This project is a sophisticated full-stack web application built to automate and analyze the "Stair-Step" covered call rolling strategy. It is designed to help options traders seamlessly manage their portfolios, adjust strikes, and leverage automated math to maximize premium income.

## 🚀 Project Overview

Managing covered calls effectively requires constant monitoring of the underlying asset's price, Greeks, and premium thresholds. This application simplifies the process by:

- **Inputting Trade Data**: Easily log your covered calls while capturing Greeks and underlying metrics.
- **Strategy Analysis**: A robust backend Option Math engine evaluates your position against a target 5% rolling threshold.
- **Executing the Roll**: Providing clear, actionable recommendations on when to move your strike up to maintain a net credit.

## 💻 Technical Architecture & Tech Stack

This project demonstrates a modern, cloud-native architecture built for scale, performance, and type safety:

### **Frontend**

- **React 18 + Vite**: Lightning-fast development and optimized production builds.
- **TypeScript**: End-to-end type safety reducing runtime errors.
- **Tailwind CSS & Lucide Icons**: Modern, responsive, and highly professional UI/UX.
- **TanStack React Query & Axios**: Advanced data fetching, caching, and state management.
- **Clerk**: Secure, seamless user authentication and session management.

### **Backend & Infrastructure**

- **Java 21 & Spring Boot 3**: High-performance, scalable RESTful API handling complex financial logic.
- **PostgreSQL**: Relational database for robust, ACID-compliant trade history storage.
- **Render CI/CD**: Automated deployment pipelines for continuous delivery.

## 📈 Current Project Status

The core foundation of the application has been successfully built and deployed:

- [x] **Secure Authentication**: Fully integrated Clerk authentication with protected dashboard routes.
- [x] **Frontend Architecture**: Modern React application utilizing `useQuery` and `useMutation` for seamless cache invalidation and data synchronization.
- [x] **Core Analysis Engine**: Spring Boot backend accurately evaluating option data and returning strategic roll recommendations.
- [x] **Professional UI**: Responsive, polished landing page and dashboard highlighting the platform's value proposition.

## 🔮 Future Roadmap

As this project continues to evolve, the following features are planned to make it a fully automated trading companion:

1. **Live Market Data Integration**
   - Connect to external financial APIs (e.g., Polygon.io, TD Ameritrade) to pull real-time option chains, Greeks, and underlying prices automatically.
2. **Advanced Charting & Analytics**
   - Implement data visualization (via libraries like Recharts or Chart.js) to map the decay of extrinsic value and position P&L over time.

3. **Automated Alerts System**
   - Build a background chron job/service to send SMS or email notifications when an option crosses the target rolling threshold.

4. **Multi-Strategy Support**
   - Expand the Java engine to analyze additional options strategies, such as Cash Secured Puts and the "Wheel" strategy.

---

_Designed and developed by Nirav Sheth._
