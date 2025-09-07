function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

const initialPlayers = [
  {
    nome: "Andressa Alves",
    posicao: "Meio-campo",
    clube: "Corinthians",
    foto: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=300&fit=crop&crop=face",
    gols: 15,
    assistencias: 10,
    jogos: 28,
    favorita: false,
  },
  {
    nome: "Dayana Rodríguez",
    posicao: "Meio-campo",
    clube: "Corinthians",
    foto: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=300&fit=crop&crop=face",
    gols: 5,
    assistencias: 12,
    jogos: 30,
    favorita: false,
  },
  {
    nome: "Mariza",
    posicao: "Zagueira",
    clube: "Corinthians",
    foto: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=300&fit=crop&crop=face",
    gols: 2,
    assistencias: 1,
    jogos: 32,
    favorita: false,
  },
  {
    nome: "Thaís Regina",
    posicao: "Zagueira",
    clube: "Corinthians",
    foto: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=300&fit=crop&crop=face",
    gols: 1,
    assistencias: 2,
    jogos: 25,
    favorita: false,
  },
  {
    nome: "Letícia Teles",
    posicao: "Zagueira",
    clube: "Corinthians",
    foto: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=300&fit=crop&crop=face",
    gols: 0,
    assistencias: 0,
    jogos: 18,
    favorita: false,
  },
];

class PlayerManager {
  constructor() {
    this.players = [];
    this.editingPlayerId = null;
    this.filteredPlayers = [];
    this.init();
  }

  init() {
    this.loadPlayers();
    this.setupEventListeners();
    this.applyFilters();
    this.updateClubFilter();
  }

  loadPlayers() {
    const storedPlayers = localStorage.getItem("footballPlayers");
    if (storedPlayers) {
      this.players = JSON.parse(storedPlayers);
    } else {
      this.players = initialPlayers.map((player) => ({
        ...player,
        id: generateId(),
      }));
      this.savePlayers();
    }
    this.filteredPlayers = [...this.players];
  }

  savePlayers() {
    localStorage.setItem("footballPlayers", JSON.stringify(this.players));
  }

  setupEventListeners() {
    const form = document.getElementById("player-form");
    form.addEventListener("submit", (e) => this.handleFormSubmit(e));

    document
      .getElementById("cancel-btn")
      .addEventListener("click", () => this.cancelEdit());

    document
      .getElementById("search-input")
      .addEventListener("input", (e) => this.handleSearch(e));

    document
      .getElementById("clube-filter")
      .addEventListener("change", (e) => this.handleClubFilter(e));

    document
      .getElementById("sort-select")
      .addEventListener("change", (e) => this.handleSort(e));

    document
      .getElementById("reset-data-btn")
      .addEventListener("click", () => this.resetData());

    document
      .getElementById("modal-confirm")
      .addEventListener("click", () => this.confirmModalAction());
    document
      .getElementById("modal-cancel")
      .addEventListener("click", () => this.closeModal());

    document
      .getElementById("alert-close")
      .addEventListener("click", () => this.hideAlert());

    document.getElementById("modal").addEventListener("click", (e) => {
      if (e.target.id === "modal") {
        this.closeModal();
      }
    });
  }

  generateId() {
    return generateId();
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const playerData = {
      nome: formData.get("nome").trim(),
      posicao: formData.get("posicao"),
      clube: formData.get("clube").trim(),
      foto: formData.get("foto").trim(),
      gols: parseInt(formData.get("gols")) || 0,
      assistencias: parseInt(formData.get("assistencias")) || 0,
      jogos: parseInt(formData.get("jogos")) || 0,
      favorita: false,
    };

    if (
      !playerData.nome ||
      !playerData.posicao ||
      !playerData.clube ||
      !playerData.foto
    ) {
      this.showAlert(
        "Por favor, preencha todos os campos obrigatórios!",
        "error"
      );
      return;
    }

    if (this.editingPlayerId) {
      this.updatePlayer(this.editingPlayerId, playerData);
      this.showAlert("Jogadora editada com sucesso!", "success");
    } else {
      playerData.id = this.generateId();
      this.addPlayer(playerData);
      this.showAlert("Jogadora adicionada com sucesso!", "success");
    }

    this.resetForm();
    this.applyFilters();
    this.updateClubFilter();
  }

  addPlayer(playerData) {
    this.players.push(playerData);
    this.savePlayers();
  }

  updatePlayer(id, playerData) {
    const index = this.players.findIndex((player) => player.id === id);
    if (index !== -1) {
      playerData.id = id;
      playerData.favorita = this.players[index].favorita;
      this.players[index] = playerData;
      this.savePlayers();
    }
  }

  removePlayer(id) {
    this.players = this.players.filter((player) => player.id !== id);
    this.savePlayers();
  }

  toggleFavorite(id) {
    const player = this.players.find((p) => p.id === id);
    if (player) {
      player.favorita = !player.favorita;
      this.savePlayers();
      this.applyFilters();
    }
  }

  startEdit(id) {
    const player = this.players.find((p) => p.id === id);
    if (player) {
      this.editingPlayerId = id;

      document.getElementById("nome").value = player.nome;
      document.getElementById("posicao").value = player.posicao;
      document.getElementById("clube").value = player.clube;
      document.getElementById("foto").value = player.foto;
      document.getElementById("gols").value = player.gols;
      document.getElementById("assistencias").value = player.assistencias;
      document.getElementById("jogos").value = player.jogos;

      document.getElementById("form-title").textContent = "Editar Jogadora";
      document.getElementById("submit-btn").textContent = "Salvar Alterações";
      document.getElementById("cancel-btn").style.display = "inline-block";

      document
        .querySelector(".form-section")
        .scrollIntoView({ behavior: "smooth" });
    }
  }

  cancelEdit() {
    this.editingPlayerId = null;
    this.resetForm();
  }

  resetForm() {
    document.getElementById("player-form").reset();
    document.getElementById("form-title").textContent =
      "Cadastrar Nova Jogadora";
    document.getElementById("submit-btn").textContent = "Cadastrar Jogadora";
    document.getElementById("cancel-btn").style.display = "none";
    this.editingPlayerId = null;
  }

  handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    this.applyFilters(searchTerm);
  }

  handleClubFilter(e) {
    this.applyFilters();
  }

  applyFilters(searchTerm = null) {
    const searchInput = document.getElementById("search-input");
    const clubFilter = document.getElementById("clube-filter");

    const search =
      searchTerm !== null ? searchTerm : searchInput.value.toLowerCase();
    const selectedClub = clubFilter.value;

    this.filteredPlayers = this.players.filter((player) => {
      const matchesSearch =
        !search ||
        player.nome.toLowerCase().includes(search) ||
        player.posicao.toLowerCase().includes(search);

      const matchesClub = !selectedClub || player.clube === selectedClub;

      return matchesSearch && matchesClub;
    });

    this.renderPlayers();
  }

  handleSort(e) {
    const sortBy = e.target.value;
    this.filteredPlayers.sort((a, b) => {
      switch (sortBy) {
        case "nome":
          return a.nome.localeCompare(b.nome);
        case "posicao":
          return a.posicao.localeCompare(b.posicao);
        case "gols":
          return b.gols - a.gols;
        case "jogos":
          return b.jogos - a.jogos;
        default:
          return 0;
      }
    });
    this.renderPlayers();
  }

  updateClubFilter() {
    const clubFilter = document.getElementById("clube-filter");
    const clubs = [
      ...new Set(this.players.map((player) => player.clube)),
    ].sort();

    clubFilter.innerHTML = '<option value="">Todos os clubes</option>';

    clubs.forEach((club) => {
      const option = document.createElement("option");
      option.value = club;
      option.textContent = club;
      clubFilter.appendChild(option);
    });
  }

  renderPlayers() {
    const playersGrid = document.getElementById("players-grid");
    const noPlayers = document.getElementById("no-players");

    if (this.filteredPlayers.length === 0) {
      playersGrid.style.display = "none";
      noPlayers.style.display = "block";
      return;
    }

    playersGrid.style.display = "grid";
    noPlayers.style.display = "none";

    playersGrid.innerHTML = this.filteredPlayers
      .map((player) => this.createPlayerCard(player))
      .join("");
  }

  createPlayerCard(player) {
    return `
            <div class="player-card ${
              player.favorita ? "favorita" : ""
            }" data-id="${player.id}">
                <img src="${player.foto}" alt="${
      player.nome
    }" class="player-photo" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjdmYWZjIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuw6NvIGVuY29udHJhZGE8L3RleHQ+PC9zdmc+'">
                <div class="player-info">
                    <h3 class="player-name">${player.nome}</h3>
                    <p class="player-position">${player.posicao}</p>
                    <p class="player-club">${player.clube}</p>
                    
                    <div class="player-stats">
                        <div class="stat-item">
                            <div class="stat-number">${player.gols}</div>
                            <div class="stat-label">Gols</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">${
                              player.assistencias
                            }</div>
                            <div class="stat-label">Assistências</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">${player.jogos}</div>
                            <div class="stat-label">Jogos</div>
                        </div>
                    </div>
                    
                    <div class="player-actions">
                        <button class="action-btn btn-favorite ${
                          player.favorita ? "active" : ""
                        }" 
                                onclick="playerManager.toggleFavorite('${
                                  player.id
                                }')" 
                                title="${
                                  player.favorita
                                    ? "Remover dos favoritos"
                                    : "Adicionar aos favoritos"
                                }">
                            <i class="fas fa-star"></i>
                        </button>
                        <button class="action-btn btn-edit" onclick="playerManager.startEdit('${
                          player.id
                        }')">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="action-btn btn-delete" onclick="playerManager.confirmDelete('${
                          player.id
                        }')">
                            <i class="fas fa-trash"></i> Excluir
                        </button>
                    </div>
                </div>
            </div>
        `;
  }

  confirmDelete(id) {
    const player = this.players.find((p) => p.id === id);
    if (player) {
      this.showModal(
        "Confirmar Exclusão",
        `Tem certeza que deseja excluir a jogadora "${player.nome}"?`,
        () => {
          this.removePlayer(id);
          this.showAlert("Jogadora removida com sucesso!", "success");
          this.applyFilters();
          this.updateClubFilter();
        }
      );
    }
  }

  showModal(title, message, onConfirm) {
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-message").textContent = message;
    document.getElementById("modal").style.display = "block";

    const confirmBtn = document.getElementById("modal-confirm");
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

    newConfirmBtn.addEventListener("click", () => {
      onConfirm();
      this.closeModal();
    });
  }

  closeModal() {
    document.getElementById("modal").style.display = "none";
  }

  confirmModalAction() {}

  showAlert(message, type = "success") {
    const alert = document.getElementById("alert");
    const alertMessage = document.getElementById("alert-message");

    alertMessage.textContent = message;
    alert.className = `alert ${type}`;
    alert.style.display = "flex";

    setTimeout(() => {
      this.hideAlert();
    }, 5000);
  }

  hideAlert() {
    document.getElementById("alert").style.display = "none";
  }

  resetData() {
    this.showModal(
      "Resetar Dados",
      "Tem certeza que deseja resetar todos os dados? Isso irá restaurar as jogadoras iniciais e remover todas as alterações.",
      () => {
        localStorage.removeItem("footballPlayers");
        this.loadPlayers();
        this.applyFilters();
        this.updateClubFilter();
        this.showAlert("Dados resetados com sucesso!", "success");
      }
    );
  }
}

let playerManager;
document.addEventListener("DOMContentLoaded", () => {
  playerManager = new PlayerManager();
});
