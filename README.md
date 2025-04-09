# GCP Terraform Deployment and Automation

This project automates the provisioning and testing of infrastructure on Google Cloud Platform (GCP) using Terraform and GitHub Actions. It facilitates continuous integration and deployment (CI/CD) by automating infrastructure setup, application deployment, and testing. The key components of the project include infrastructure definitions using Terraform, automation scripts for generating documentation and running tests, and a GitHub Actions workflow to orchestrate the automation process.

## Key Technologies
- **Terraform:** Used for defining and managing the desired infrastructure on GCP. It provisions resources like Cloud Run services and Google Cloud Storage buckets.
- **GitHub Actions:** Automates the workflow for deploying infrastructure changes, running tests, generating documentation, and handling other CI/CD tasks.
- **JavaScript and Node.js:** Utilized in scripts to generate AI-powered documentation and tests, manage deployments, and perform additional automation tasks.
- **OpenAI API:** Used for generating documentation and test scripts dynamically.
- **Google Cloud Platform Services:** Hosts the infrastructure services required by the application, including Cloud Run for deploying applications and Cloud Storage for storing test artifacts and logs.
- **SendGrid:** For sending email notifications with test results and artifacts.

## Project Workflow & Logic

1. **Trigger:** The automation workflow is triggered by a push to the main branch.

2. **Infrastructure Management:**
   - **Terraform Initialization and Deployment:** The workflow checks the `tf_action` variable to decide whether to apply or destroy infrastructure. Terraform is initialized, planned, and applied or destroyed as specified in the `terraform.tfvars.json`.
   - **Resource Definitions:** Resources such as Google Cloud Run services and Google Storage Buckets are created and managed through Terraform scripts.

3. **Documentation and Tests Generation:**
   - **AI-Generated Documentation:** Utilizes OpenAI's API to produce AI-enhanced documentation for Terraform configurations, generating a README and other relevant docs.
   - **AI-Generated Tests:** Creates a Playwright test script based on deployed web applications, ensuring they meet specified criteria.

4. **Execution of Tests and Artifacts Handling:**
   - **Playwright Testing:** Executes AI-generated tests, captures results, and takes screenshots.
   - **Log and Result Management:** Logs from Terraform applications and Playwright test results are uploaded.

5. **Notifications and Reporting:**
   - **Email Notifications:** Sends out detailed email reports, including links to test scripts and screenshots stored in Google Cloud Storage, using SendGrid.

6. **Version Control and Continuous Improvement:**
   - **CI/CD Integration:** Automatically commits documentation changes back to the repository when generated.
   - **Environment Management:** Securely handles credentials and sensitive data via GitHub secrets.

This comprehensive setup ensures that infrastructure is quickly provisioned and validated, with insights shared and documented effectively across teams.