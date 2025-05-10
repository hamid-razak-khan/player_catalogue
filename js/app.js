// State management
let players = [...samplePlayers];
let filteredPlayers = [...players];
let cartPlayers = [];
let isAdmin = false;

// DOM Elements
const searchInput = document.getElementById('searchInput');
const roleFilter = document.getElementById('roleFilter');
const sortBy = document.getElementById('sortBy');
const resetFiltersBtn = document.getElementById('resetFilters');
const adminToggleBtn = document.getElementById('adminToggle');
const themeToggleBtn = document.getElementById('themeToggle');
const adminForm = document.getElementById('adminForm');
const addPlayerForm = document.getElementById('addPlayerForm');
const playerGrid = document.getElementById('playerGrid');

// Utility functions
const formatAmount = (amount) => {
  if (amount >= 10000000) {
    return `${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `${(amount / 100000).toFixed(2)} L`;
  }
  return amount.toLocaleString();
};

const createPlayerCard = (player) => {
  const isInCart = cartPlayers.some(p => p.id === player.id);
  const roleClass = `role-${player.role.toLowerCase().replace(' ', '-')}`;
  const roleBadgeClass = `role-badge-${player.role.toLowerCase().replace(' ', '-')}`;

  const card = document.createElement('div');
  card.className = `player-card ${roleClass} ${isInCart ? 'in-cart' : ''}`;
  
  card.innerHTML = `
    <div class="player-image">
      <img src="${player.imageUrl || '/placeholder.svg'}" alt="${player.name}" onerror="this.src='/placeholder.svg'">
      <span class="role-badge ${roleBadgeClass}">${player.role}</span>
    </div>
    <h3 class="player-name">${player.name}</h3>
    <p class="player-team">${player.team}</p>
    <div class="player-stats">
      <div class="stat-group">
        <span class="stat-value">${player.matches}</span>
        <span class="stat-label">Matches</span>
      </div>
      ${player.role !== 'Bowler' ? `
        <div class="stat-group">
          <span class="stat-value">${player.runs}</span>
          <span class="stat-label">Runs</span>
        </div>
      ` : ''}
      ${player.role !== 'Batsman' && player.role !== 'Wicketkeeper' ? `
        <div class="stat-group">
          <span class="stat-value">${player.wickets}</span>
          <span class="stat-label">Wickets</span>
        </div>
      ` : ''}
    </div>
    <div class="player-price">${formatAmount(player.basePrice)}</div>
  `;

  card.addEventListener('click', () => handleAddToCart(player));
  return card;
};

const updatePlayerGrid = () => {
  playerGrid.innerHTML = '';
  if (filteredPlayers.length === 0) {
    playerGrid.innerHTML = `
      <div class="no-players">
        <h3>No players found</h3>
        <p>Try changing your filters or search query</p>
      </div>
    `;
    return;
  }
  filteredPlayers.forEach(player => {
    playerGrid.appendChild(createPlayerCard(player));
  });
};

const applyFilters = () => {
  let result = [...players];
  
  // Apply role filter
  if (roleFilter.value !== 'all') {
    result = result.filter(player => 
      player.role.toLowerCase() === roleFilter.value.replace('-', ' ')
    );
  }
  
  // Apply search query
  if (searchInput.value) {
    const query = searchInput.value.toLowerCase();
    result = result.filter(player =>
      player.name.toLowerCase().includes(query) ||
      player.team.toLowerCase().includes(query)
    );
  }
  
  // Apply sorting
  switch (sortBy.value) {
    case 'name-asc':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'price-asc':
      result.sort((a, b) => a.basePrice - b.basePrice);
      break;
    case 'price-desc':
      result.sort((a, b) => b.basePrice - a.basePrice);
      break;
    case 'runs-desc':
      result.sort((a, b) => b.runs - a.runs);
      break;
    case 'wickets-desc':
      result.sort((a, b) => b.wickets - a.wickets);
      break;
  }
  
  filteredPlayers = result;
  updatePlayerGrid();
};

const handleAddToCart = (player) => {
  const index = cartPlayers.findIndex(p => p.id === player.id);
  if (index !== -1) {
    cartPlayers.splice(index, 1);
  } else {
    cartPlayers.push(player);
  }
  updatePlayerGrid();
};

const handleAddPlayer = (e) => {
  e.preventDefault();
  
  const formData = new FormData(addPlayerForm);
  const newPlayer = {
    id: Date.now().toString(),
    name: formData.get('playerName'),
    role: formData.get('playerRole').charAt(0).toUpperCase() + formData.get('playerRole').slice(1),
    team: formData.get('playerTeam'),
    basePrice: parseInt(formData.get('basePrice')),
    matches: parseInt(formData.get('matches')) || 0,
    runs: parseInt(formData.get('runs')) || 0,
    wickets: parseInt(formData.get('wickets')) || 0,
    imageUrl: formData.get('imageUrl') || '/placeholder.svg'
  };
  
  players.push(newPlayer);
  addPlayerForm.reset();
  applyFilters();
  
  // Show success message
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = `${newPlayer.name} has been added to the catalogue`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};

const resetFilters = () => {
  searchInput.value = '';
  roleFilter.value = 'all';
  sortBy.value = 'name-asc';
  applyFilters();
};

const toggleAdmin = () => {
  isAdmin = !isAdmin;
  adminForm.classList.toggle('hidden');
  adminToggleBtn.classList.toggle('active');
};

const toggleTheme = () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Event Listeners
searchInput.addEventListener('input', applyFilters);
roleFilter.addEventListener('change', applyFilters);
sortBy.addEventListener('change', applyFilters);
resetFiltersBtn.addEventListener('click', resetFilters);
adminToggleBtn.addEventListener('click', toggleAdmin);
themeToggleBtn.addEventListener('click', toggleTheme);
addPlayerForm.addEventListener('submit', handleAddPlayer);

// Initialize
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}

applyFilters(); 