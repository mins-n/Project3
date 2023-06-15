SELECT u.name, d.department_name, u.phone_num, u.email, d.department_name, u.academic_info AS spot, u.profile
FROM user u
JOIN department d ON u.department_code = d.department_code
WHERE u.user_class = 1
  AND u.name LIKE '%%';