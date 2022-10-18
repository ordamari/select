import { useEffect, useRef, useState } from "react"
import "./select.scss"

export function Select({
    value,
    onChange,
    placeholder,
    isMultiSelect,
    options,
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const selectRef = useRef(null);
    const inputRef = useRef(null);
    const [filterOptions, setFilterOptions] = useState([]);
    const [isInputFocus, setIsInputFocus] = useState(false);


    function clearOptions() {
        isMultiSelect ? onChange([]) : onChange(null)
        clearInput()
    }

    function updateFilterOptions(query) {
        setFilterOptions(
            options.filter(option => option.label.includes(query))
        )
        setHighlightedIndex(0);
    }

    function clearInput() {
        if (inputRef) inputRef.current.innerHTML = '';
        inputRef.current.blur();
        updateFilterOptions('');
    }

    function selectOption(option) {
        if (isMultiSelect) {
            if (value.some(item => item.id === option.id)) {
                onChange(value.filter(item => item.id !== option.id))
            } else {
                onChange([...value, option])
            }
            focusInput();
        } else {
            if (option?.id !== value?.id) onChange(option)
        }
        clearInput();

    }

    function isOptionSelected(option) {
        return isMultiSelect ? value.some(item => item.id === option.id) : value?.id === option?.id
    }

    function focusInput() {
        if (inputRef) inputRef.current.focus();
        setIsOpen(true)
    }

    function focusSelect() {
        if (selectRef.current && !selectRef.current.focus) selectRef.current.focus();
    }

    function multiSelectRemoveLastValueItem() {
        if (!isMultiSelect) return;
        selectOption(value[value.length - 1]);
    }

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0)
    }, [isOpen])

    useEffect(() => {
        const handler = (e) => {
            if (e.target != selectRef.current && e.target != inputRef.current) return
            switch (e.code) {
                case "Enter":
                    if (isOpen) selectOption(filterOptions[highlightedIndex])
                    break
                case "ArrowUp":
                case "ArrowDown": {
                    if (!isOpen) {
                        setIsOpen(true)
                        break
                    }

                    const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
                    if (newValue >= 0 && newValue < filterOptions.length) {
                        setHighlightedIndex(newValue)
                    }
                    break
                }
                case "Escape":
                    setIsOpen(false)
                    break
            }
        }
        selectRef.current?.addEventListener("keydown", handler)

        return () => {
            selectRef.current?.removeEventListener("keydown", handler)
        }
    }, [isOpen, highlightedIndex, filterOptions])

    useEffect(() => {
        updateFilterOptions(inputRef ? inputRef.current.textContent : '');
    }, [options])


    return (
        <div
            className="select"
            ref={selectRef}
            tabIndex={0}
            onFocus={() => focusInput()}
        >

            <span className="value">
                {
                    isMultiSelect
                        ? value.map(v => (
                            <button
                                key={v.id}
                                onClick={e => {
                                    e.stopPropagation()
                                    selectOption(v)
                                }}
                                className="selected-option"
                            >
                                {v.label}
                                <span className="remove-selected">&times;</span>
                            </button>
                        ))
                        : (
                            !isOpen && value?.label
                        )
                }

                {
                    placeholder &&
                    !isOpen &&
                    (
                        (isMultiSelect && !value.length) ||
                        (!isMultiSelect && !value)
                    ) &&
                    <span className="placeholder" >{placeholder}</span>
                }

                < span
                    className="filter-input"
                    contentEditable
                    ref={inputRef}
                    onInput={(e) => updateFilterOptions(e.currentTarget.textContent)}
                    onFocus={() => {
                        focusSelect()
                        setIsInputFocus(true);
                    }}
                    onBlur={() => {
                        setIsOpen(false);
                    }}
                    onKeyDown={(e) => {
                        if (e.currentTarget.textContent === '' && e.code === 'Backspace') multiSelectRemoveLastValueItem();
                        if (e.code === 'Enter') e.preventDefault();
                    }}
                />
            </span>

            <button
                onClick={e => {
                    e.stopPropagation()
                    clearOptions()
                }}
                className="clear-btn"
            >
                &times;
            </button>

            <div className="divider"></div>
            <div className="caret"></div>
            <ul className={`options ${(isOpen && filterOptions.length) ? "show" : ""}`}>
                {filterOptions.map((option, index) => (
                    <li
                        onClick={e => {
                            e.stopPropagation()
                            selectOption(option)
                            // setIsOpen(false).
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        key={option.id}
                        className={`option ${isOptionSelected(option) ? "selected" : ""
                            } ${index === highlightedIndex ? "highlighted" : ""}`}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div >
    )
}