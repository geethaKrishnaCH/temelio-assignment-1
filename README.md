# Temelio Phone Screen

## Overview

At Temelio, we are supercharging the effectiveness of the nonprofit community by building software to simplify the grant making workflow.

We are focusing on foundations as our initial customer. A foundation is a nonprofit entity that managements money on behalf of an individual or corporation. A foundation size is measured by the money it manages. The more money the foundation manages, the larger it is.

## Problem

Large foundations tend to distribute money to several hundreds of nonprofits within a year. For legal reasons, the foundation needs to formally email each nonprofit a message that contains the nonprofit's name, the address, and the current date.

As you can imagine, it is tedious for foundations to manually create an email for each nonprofit they distribute money to. We want to help make their process easier by building some UI and API endpoints to manage this workflow.

Your task is to create a full-stack application that can do the following:

- Allows someone to create and save nonprofits and their metadata (name, address, and email)
- Allows someone to create and save foundations and their metadata (email)
- Allows someone to send an email to a list of nonprofits with a templated message (i.e. "Sending money to nonprofit { name } at address { address }") and sends the email with the templated fields populated
- Allows someone to view all the emails that have been sent to nonprofits

You can make the following assumptions

- Email is a unique identifier for both nonprofits and foundations
- Assume the data passed into the API endpoints will be valid (i.e. you don't need to check for bad request data)

The backend should persist the data (in-memory is sufficient). For sending email, you typically would rely on using a third-party email sending client such as sendgrid. However, in this exercise, simply mock the email client on the backend and have it print out what the email will look like when someone makes an API request.

## Deliverable

We want you to solve this solution with Java on the backend and React/NextJS on the frontend. Feel free to use any libraries or frameworks you feel comfortable with.

Be ready to share your screen and describe your solution during the phone screen.

## Questions

Some parts of this question were left vague on purpose to see what you come up with. However, if the some instructions are unclear, don't hesitate to email ruthwick@trytemelio.com for further clarification.
