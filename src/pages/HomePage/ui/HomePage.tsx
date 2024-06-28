import { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import movieApi, { ShortMovieInfo } from '../../../shared/api/api';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  selectFilters,
  setSearch,
  setGenre,
  setYear,
  setPage,
} from '../model/slice';
import MovieCard from '../../../shared/ui/MovieCard/MovieCard';
import DropDownArrow from '../../../shared/ui/DropDownArrow/DropDownArrow';
import SearchIcon from '../../../shared/ui/SearchIcon/SearchIcon';
import CloseIcon from '../../../shared/ui/CloseIcon/CloseIcon';
import debounce from '../../../shared/model/debounce';
import Loader from '../../../shared/ui/Loader/Loader';
import { ArrowLeft, ArrowRight } from '../../../shared/ui/Arrows/Arrows';

export const GENRES: Record<string, string> = {
  '': 'Не выбран',
  comedy: 'Комедия',
  drama: 'Драма',
  action: 'Боевик',
  thriller: 'Триллер',
  horror: 'Ужасы',
  family: 'Семейный',
  cartoon: 'Анимированный',
  fantasy: 'Фэнтези',
  romance: 'Романтика',
  adventure: 'Приключения',
  musical: 'Мьюзикл',
  war: 'Военный',
};

const YEARS: Record<string, string> = {
  '0': 'Не выбран',
  '2009': '2009',
  '2008': '2008',
  '2007': '2007',
  '2006': '2006',
  '1990-2005': '1990-2005',
  '1950-1989': '1950-1989',
};

const HomePage: React.FC = () => {
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading } = movieApi.useGetMoviesQuery(filters);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    debouncedDispatchSearch(searchTerm);
  };

  const debouncedDispatchSearch = debounce((searchTerm: string) => {
    dispatch(setSearch(searchTerm));
    dispatch(setPage(1));
  }, 500);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const toggleGenreDropdown = () => {
    setIsGenreOpen(!isGenreOpen);
    setIsYearOpen(false);
  };

  const toggleYearDropdown = () => {
    setIsYearOpen(!isYearOpen);
    setIsGenreOpen(false);
  };

  const handleYearChange = (option: string) => {
    dispatch(setYear(option));
    dispatch(setPage(1));
    setIsYearOpen(false);
  };

  const handleGenreChange = (option: string) => {
    dispatch(setGenre(option));
    dispatch(setPage(1));
    setIsGenreOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    dispatch(setSearch(''));
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('title') || '';
    const genre = params.get('genre') || '';
    const year = params.get('release_year') || '';
    const page = parseInt(params.get('page') || '1', 10);

    dispatch(setSearch(search));
    dispatch(setGenre(genre));
    dispatch(setYear(year));
    dispatch(setPage(page));
  }, [location.search, dispatch]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.title) params.append('title', filters.title);
    if (filters.genre) params.append('genre', filters.genre);
    if (filters.year && filters.year !== '0')
      params.append('release_year', filters.year);
    params.append('page', filters.page.toString());

    navigate({ search: params.toString() });
  }, [filters, navigate]);

  return (
    <div className={styles.movieListPage}>
      <div className={styles.filters}>
        <h3 className={styles.filtersTitle}>Фильтр</h3>
        <label className={styles.filterLabel}>
          Жанр
          <div className={styles.selectContainer}>
            <div
              className={`${styles.selectHeader} ${filters.genre !== '' ? styles.selected : ''}`}
              onClick={toggleGenreDropdown}
            >
              {filters.genre === '' || filters.genre === '0'
                ? 'Выберите жанр'
                : GENRES[filters.genre]}
              <DropDownArrow isOpen={isGenreOpen} />
            </div>
            {isGenreOpen && (
              <ul className={styles.selectOptions}>
                {Object.entries(GENRES).map(([key, value]) => (
                  <li
                    key={key}
                    className={styles.selectOption}
                    onClick={() => handleGenreChange(key)}
                  >
                    {value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </label>
        <label className={styles.filterLabel}>
          Год выпуска
          <div className={styles.selectContainer}>
            <div
              className={`${styles.selectHeader} ${filters.year !== '' ? styles.selected : ''}`}
              onClick={toggleYearDropdown}
            >
              {filters.year === '' || filters.year === '0'
                ? 'Выберите год'
                : YEARS[filters.year]}
              <DropDownArrow isOpen={isYearOpen} />
            </div>
            {isYearOpen && (
              <ul className={styles.selectOptions}>
                {Object.entries(YEARS).map(([key, value]) => (
                  <li
                    key={key}
                    className={styles.selectOption}
                    onClick={() => handleYearChange(key)}
                  >
                    {value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </label>
      </div>
      <div className={styles.moveListContainer}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Поиск по названию"
            className={styles.searchInput}
          />
          <SearchIcon />
          {filters.title && <CloseIcon onClick={clearSearch} />}
        </div>
        {isLoading && <Loader />}
        {data?.search_result.length === 0 && (
          <div className={styles.notFound}>
            <h3 className={styles.notFoundTitle}>Фильмы не найдены</h3>
            <p className={styles.notFoundText}>
              Измените запрос и попробуйте снова
            </p>
          </div>
        )}
        <div className={styles.movieList}>
          {data?.search_result.map((movie: ShortMovieInfo) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {data?.search_result.length !== 0 && !isLoading && (
          <div className={styles.pagination}>
            <button
              className={styles.paginationBtn}
              onClick={() => handlePageChange(filters.page - 1)}
              disabled={filters.page === 1}
            >
              <ArrowLeft />
            </button>
            <span>{filters.page}</span>
            <button
              className={styles.paginationBtn}
              disabled={filters.page === data?.total_pages}
              onClick={() => handlePageChange(filters.page + 1)}
            >
              <ArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
