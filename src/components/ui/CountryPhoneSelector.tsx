import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, Phone } from 'lucide-react';

interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  cca3: string;
  flag: string;
  idd: {
    root: string;
    suffixes: string[];
  };
}

interface CountryPhoneSelectorProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

const CountryPhoneSelector: React.FC<CountryPhoneSelectorProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder = "Número de teléfono",
  className = "",
  error = false
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [focused, setFocused] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Fetch countries data
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,cca3,flag,idd');
        const data = await response.json();
        
        // Filter countries that have phone codes and sort by common name
        const countriesWithPhone = data
          .filter((country: Country) => country.idd?.root && country.idd?.suffixes?.length > 0)
          .sort((a: Country, b: Country) => a.name.common.localeCompare(b.name.common));
        
        setCountries(countriesWithPhone);
        setFilteredCountries(countriesWithPhone);
        
        // Set default country (Uruguay) only if no value is provided
        if (!value) {
          const uruguay = countriesWithPhone.find((c: Country) => c.cca2 === 'UY');
          if (uruguay) {
            setSelectedCountry(uruguay);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Parse existing phone value
  useEffect(() => {
    if (value && countries.length > 0) {
      // Try to extract country code and phone number from existing value
      const parts = value.split(' ');
      if (parts.length >= 2) {
        const possibleCountryCode = parts[0];
        const phone = parts.slice(1).join(' ');
        
        // Find country by phone code
        const country = countries.find(c => 
          c.idd.suffixes.some(suffix => 
            c.idd.root + suffix === possibleCountryCode
          )
        );
        
        if (country) {
          setSelectedCountry(country);
          setPhoneNumber(phone);
        } else {
          setPhoneNumber(value);
        }
      } else if (value && !value.startsWith('+')) {
        // If it's just a phone number without country code
        setPhoneNumber(value);
      } else {
        setPhoneNumber('');
      }
    } else if (!value) {
      setPhoneNumber('');
    }
  }, [value, countries]);

  // Filter countries based on search
  useEffect(() => {
    if (searchTerm) {
      const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.name.official.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.cca2.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.cca3.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  }, [searchTerm, countries]);

  // Handle country selection
  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchTerm('');
    
    // Update the full phone value
    const phoneCode = country.idd.root + country.idd.suffixes[0];
    const fullPhone = phoneNumber ? `${phoneCode} ${phoneNumber}` : '';
    onChange(fullPhone);
  };

  // Handle phone number change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setPhoneNumber(newPhone);
    
    if (selectedCountry) {
      const phoneCode = selectedCountry.idd.root + selectedCountry.idd.suffixes[0];
      const fullPhone = newPhone ? `${phoneCode} ${newPhone}` : '';
      onChange(fullPhone);
    } else {
      onChange(newPhone);
    }
  };

  // Handle focus
  const handleFocus = () => {
    setFocused(true);
    onFocus?.();
  };

  // Handle blur
  const handleBlur = () => {
    setFocused(false);
    onBlur?.();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  if (loading) {
    return (
      <div className={`relative ${className}`}>
        <div className="w-full px-4 py-2 bg-blue-800/30 border border-blue-700 rounded-lg text-white flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400 mr-3"></div>
          Cargando países...
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="flex">
        {/* Country Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`flex items-center justify-center px-3 h-10 bg-blue-800/30 border border-r-0 border-blue-700 rounded-l-lg text-white hover:bg-blue-800/50 transition-all duration-300 ${
              focused ? 'border-blue-400 ring-2 ring-blue-500/20 bg-blue-800/50' : ''
            } ${error ? 'border-red-500 bg-red-900/20' : ''}`}
          >
            {selectedCountry ? (
              <>
                <span className="text-lg mr-2">{selectedCountry.flag}</span>
                <span className="text-sm font-medium">
                  {selectedCountry.idd.root}{selectedCountry.idd.suffixes[0]}
                </span>
              </>
            ) : (
              <Phone className="w-4 h-4 mr-2" />
            )}
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute top-full left-0 mt-1 w-80 bg-blue-900/95 backdrop-blur-sm border border-blue-700/50 rounded-lg shadow-xl z-50 max-h-48 overflow-hidden">
              {/* Search */}
              <div className="p-3 border-b border-blue-700/30">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-300" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar país..."
                    className="w-full pl-10 pr-4 py-2 bg-blue-800/30 border border-blue-600/50 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Countries List */}
              <div className="max-h-32 overflow-y-auto">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <button
                      key={country.cca2}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className="w-full flex items-center px-3 py-1 text-left hover:bg-blue-800/50 transition-all duration-300 group border-l-2 border-transparent hover:border-blue-400/50"
                    >
                      <span className="text-lg mr-3 group-hover:scale-110 transition-transform duration-200">{country.flag}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium truncate group-hover:text-blue-200 transition-colors duration-200">
                          {country.name.common}
                        </div>
                        <div className="text-blue-300/70 text-sm truncate group-hover:text-blue-200/80 transition-colors duration-200">
                          {country.name.official}
                        </div>
                      </div>
                      <span className="text-blue-400 font-mono text-sm ml-2 group-hover:text-cyan-400 transition-colors duration-200">
                        {country.idd.root}{country.idd.suffixes[0]}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-4 text-blue-300/70 text-center">
                    No se encontraron países
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Phone Number Input */}
        <div className="flex-1 relative">
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`w-full px-4 h-10 bg-blue-800/30 border border-blue-700 rounded-r-lg transition-all duration-300 text-white ${
              focused ? 'border-blue-400 ring-2 ring-blue-500/20 bg-blue-800/50' : 'hover:border-blue-600'
            } ${error ? 'border-red-500 bg-red-900/20' : ''}`}
          />
          <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 ${focused ? 'w-full' : ''}`}></span>
        </div>
      </div>
    </div>
  );
};

export default CountryPhoneSelector;
