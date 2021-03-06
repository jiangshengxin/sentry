export default function getProjectsByTeams(teams, projects, isSuperuser = false) {
  const projectsByTeam = {};
  const teamlessProjects = [];
  let usersTeams = new Set(teams.filter(team => team.isMember).map(team => team.slug));

  if (usersTeams.size === 0 && isSuperuser) {
    usersTeams = new Set(teams.map(team => team.slug));
  }

  projects.forEach(project => {
    if (!project.teams.length && project.isMember) {
      teamlessProjects.push(project);
    } else {
      project.teams.forEach(team => {
        if (!usersTeams.has(team.slug)) {
          return;
        }
        if (!projectsByTeam[team.slug]) {
          projectsByTeam[team.slug] = [];
        }
        projectsByTeam[team.slug].push(project);
      });
    }
  });

  return {projectsByTeam, teamlessProjects};
}
