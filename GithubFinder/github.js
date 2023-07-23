class Github {
  constructor() {
    this.clientId = "39899b4cd2b1c3692f92";
    this.clientSecret = "c02a70d43045c6aee3d70ec4a362e104d3b532a7";
    this.perPage = 10;
    this.sort = "asc";
  }

  // Kullanıcı bilgisini API'den alır
  async getUser(username) {
    const profileRes = await fetch(
      `https://api.github.com/users/${username}?client_id=${this.clientId}&client_secret=${this.clientSecret}`
    );

    const repoRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=${this.perPage}&sort=${this.sort}&client_id=${this.clientId}&client_secret=${this.clientSecret}`
    );

    const profile = await profileRes.json();
    const repos = await repoRes.json();

    return {
      profile,
      repos,
    };
  }
}

export default Github;
