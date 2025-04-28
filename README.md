# Valid Assembly Writing Guide for the Assembler

This document describes the syntax, rules, and best practices for writing valid Assembly code compatible with the **Assembler**.

---

## 1. Assembly Code Structure

Each line of code can contain:

```
[<label>] <instruction> [<arguments>]
```

- **Label (optional):** Starts with a `.` (dot) and must be defined alone on a line.
- **Instruction (mandatory):** A keyword recognized by the assembler.
- **Arguments (depending on the instruction):** Registers, immediate values, labels, or defines.
- **Comments:** Not processed directly but can be added using `//`, `#`, or `;` (optional).

---

## 2. Valid Instructions

```
nop, hlt, add, sub, nor, and, xor, rsh, 
ldi, adi, jmp, brh, jid, adc, lod, str, 
cmp, mov, neg, not, inc, dec, lsh
```

Each instruction requires a specific number of arguments.

---

## 3. Registers

Available registers:

```
r0, r1, r2, ..., r15
```

(4-bit registers)

---

## 4. Labels

- Defined with a `.` and placed alone on a line.
- Example:

```assembly
.label
```

- Must be unique.

---

## 5. Defines

- Creates constant symbols that can be used in the code.
- Syntax:

```assembly
define SYMBOL VALUE
```

- Example:

```assembly
define SCREEN_WIDTH 128
```

- Defines can reference other defines.

---

## 6. Branch Conditions

Recognized conditions for `BRH`:

| Condition | Keyword | Alternatives |
|:---------:|:-------:|:------------:|
| Positive | `pos` | `>0`, `notmsb` |
| Negative | `neg` | `<0`, `msb` |
| Less than | `lt` | `<`, `notcarry` |
| Greater or equal | `ge` | `>=`, `carry` |
| Equal | `eq` | `=`, `zero` |
| Not equal | `ne` | `!=`, `notzero` |
| Odd | `odd` | `!%2`, `noteven` |
| Even | `even` | `%2`, `even` |

---

## 7. Special Ports Operations

Automatically mapped ports:

```
clear_sreen_buffer, buffer_screen, clear_pixel, draw_pixel,
pixel_x, pixel_y, number_display_low_8, number_display_high8
```

Mapped starting from address `246`.

---

## 8. Expected Arguments by Instruction

| Instruction | Arguments | Note |
|:-----------:|:---------:|:----:|
| `ldi`, `adi`, `jid` | 2 | register, immediate or symbol |
| `add`, `sub`, `and`, `xor`, `nor`, `adc` | 3 | regC regA regB |
| `lod`, `str` | 2 or 3 | regC regA [offset] |
| `mov`, `cmp`, `not`, `neg`, `lsh`, `rsh` | 2 | registers |
| `brh` | 2 | condition, destination |
| `jmp` | 1 | destination |
| `inc`, `dec` | 1 | register |
| `nop`, `hlt` | 0 | no arguments |

---

## 9. Assembly Code Examples

### LDI with a number:
```assembly
LDI r1 10
```

### LDI with define:
```assembly
define VALUE 42
LDI r1 VALUE
```

### ADD with three registers:
```assembly
ADD r4 r2 r3
```

### BRH using conditions:
```assembly
BRH >0 1
BRH lt 5
```

### Using labels:
```assembly
.label
JMP .label
```

### Using ports:
```assembly
LDI r1 pixel_x
```

### Using define referencing a port:
```assembly
define PORT pixel_y
LDI r2 PORT
```

---

## 10. Validation and Errors

The assembler automatically validates:

- Unrecognized instructions.
- Incorrect number of arguments.
- Invalid registers or values.
- Duplicate labels or defines.

In case of an error, the line and corresponding message will be reported.

---

# Best Practices

- Use comments to explain each part of your code.
- Name defines and labels clearly.
- Maintain consistent indentation for better readability.

---

**By following this guide, your Assembly code will be valid for execution in the Assembler!**

