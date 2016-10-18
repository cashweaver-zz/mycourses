# Online Learning Platform

A self-hosted online learning platform written in node.

## Development Plan

- [x] Basic views
  - [x] Home
- [x] Courses and Sections
  - [x] Courses
  - [x] Sections
- [x] Course and Section views
  - [x] Course list
  - [x] Course detail
  - [x] Section detail
- [x] Admin views
  - [x] Manage courses
  - [x] Add course
  - [x] Edit course
  - [x] Manage sections
  - [x] Add sections
  - [x] Edit sections
- [x] Users
- [x] User views
  - [x] Detail
  - [x] Add
  - [x] Edit
  - [x] Manage (admin)
- [ ] Authentication
- [ ] Authorization
  - Only authorized users can
    - [ ] Access the admin views
    - [ ] Create a Course
    - [ ] View the list of all Courses
    - [ ] View a Course
    - [ ] Edit a Course
    - [ ] Delete a Course
    - [ ] Create a Section
    - [ ] View a Section
    - [ ] Edit a Section
    - [ ] Delete a Section
- [ ] Authentication views
  - [ ] Register
  - [ ] Login
  - [ ] Logout

## Lessons Learned

- REST APIs
  - Don't reimplement the wheel! Use Loopback or another pre-existing solution.
