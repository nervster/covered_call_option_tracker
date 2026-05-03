# Use a lightweight Java 21 image
FROM eclipse-temurin:21-jdk-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy the gradle files to install dependencies first (caching)
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Grant execution rights on the pipelined gradlew
RUN chmod +x gradlew

# Copy the source code
COPY src src

# Build the application
RUN ./gradlew clean build -x test

# Since we told Gradle to name it app.jar, we just move it up
RUN mv build/libs/app.jar .

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]