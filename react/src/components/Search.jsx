const Search = () => {
  return (
    <div className='hidden md:block '>
      <label className='input input-bordered flex items-center gap-2'>
        <input type='text' className='grow' placeholder='Search' />
        <kbd className='kbd kbd-sm'>⌘</kbd>
        <kbd className='kbd kbd-sm'>K</kbd>
      </label>
    </div>
  );
};

export default Search;
