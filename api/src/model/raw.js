"use strict";

const installation_list = `select *
from
  "installation"
join
  "collaboration"
on
  "collaboration.installation" = "installation.id"
where
  "collaboration.user" = $1
order by
  "installation.name"
`

module.exports = {
  installation_list
}