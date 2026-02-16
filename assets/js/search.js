document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');
    const categoryFilter = document.getElementById('category-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');
    let articles = [];

    // Fetch Data
    try {
        const response = await fetch('/assets/data/search.json');
        articles = await response.json();

        // Check for URL params
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        if (query) {
            searchInput.value = query;
            filterAndDisplay(query);
        } else {
            displayResults(articles); // Show all by default or empty? Let's show all.
        }

    } catch (error) {
        console.error('Error fetching search data:', error);
        resultsContainer.innerHTML = '<p class="text-red-500">Failed to load search data.</p>';
    }

    // Event Listeners
    searchInput.addEventListener('input', (e) => filterAndDisplay(e.target.value));
    categoryFilter.addEventListener('change', () => filterAndDisplay(searchInput.value));
    difficultyFilter.addEventListener('change', () => filterAndDisplay(searchInput.value));

    function filterAndDisplay(query) {
        const term = query.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedDifficulty = difficultyFilter.value;

        const filtered = articles.filter(article => {
            const matchesSearch = article.title.toLowerCase().includes(term) ||
                article.description.toLowerCase().includes(term) ||
                article.tags.some(tag => tag.toLowerCase().includes(term));

            const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
            const matchesDifficulty = selectedDifficulty === 'All' || article.difficulty === selectedDifficulty;

            return matchesSearch && matchesCategory && matchesDifficulty;
        });

        displayResults(filtered);
    }

    function displayResults(items) {
        resultsContainer.innerHTML = '';

        if (items.length === 0) {
            resultsContainer.innerHTML = `
                <div class="text-center py-12">
                    <p class="text-gray-500 dark:text-gray-400 text-lg">No tutorials found matching your criteria.</p>
                </div>
            `;
            return;
        }

        const grid = document.createElement('div');
        grid.className = 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3';

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow';

            const badgeColor = item.difficulty === 'Beginner' ? 'green' : (item.difficulty === 'Intermediate' ? 'yellow' : 'red');

            card.innerHTML = `
                <div class="px-4 py-5 sm:p-6 flex flex-col h-full">
                    <div class="flex items-center justify-between mb-4">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${badgeColor}-100 text-${badgeColor}-800">
                            ${item.difficulty}
                        </span>
                        <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            ${item.category}
                        </span>
                    </div>
                    <a href="${item.url}" class="block mt-2 mb-4 flex-grow">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            ${item.title}
                        </h3>
                        <p class="mt-2 text-base text-gray-500 dark:text-gray-400">
                            ${item.description}
                        </p>
                    </a>
                    <div class="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                         <a href="${item.url}" class="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center">
                            Read Tutorial
                            <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        resultsContainer.appendChild(grid);
    }
});
