<script lang="ts">
    interface Props {
      tabs: string[];
      activeIndex: number;
      class?: string;
    }
    
    let {
      tabs = [],
      activeIndex = $bindable(),
      class: className = ''
    }: Props = $props();
    
    let container: HTMLDivElement;
    let indicator: HTMLDivElement;
    let buttons: HTMLButtonElement[] = $state([]);
    
    function updateIndicator(index: number) {
      if (!buttons[index] || !indicator) return;
      
      const button = buttons[index];
      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      
      indicator.style.transform = `translateX(${buttonRect.left - containerRect.left}px)`;
      indicator.style.width = `${buttonRect.width}px`;
    }
    
    $effect(() => {
      if (activeIndex >= 0 && activeIndex < tabs.length && container) {
        updateIndicator(activeIndex);
      }
    });
    
    $effect(() => {
      if (!container) return;
      
      const handleResize = () => {
        if (activeIndex >= 0 && activeIndex < tabs.length) {
          updateIndicator(activeIndex);
        }
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    });
  </script>
  
  <div 
    bind:this={container}
    class="relative inline-flex h-11 items-center justify-center rounded-4xl p-1 shadow-inner bg-muted/80 dark:bg-muted/80 w-fit flex-shrink-0 {className}"
  >
    <div
      bind:this={indicator}
      class="absolute top-1 bottom-1 rounded-4xl bg-primary shadow-md duration-500 md:duration-300 custom-easing left-0 w-0"
    ></div> 
    
    {#each tabs as tab, i}
      <button
        bind:this={buttons[i]}
        class="relative z-10 px-4 py-2 text-sm font-medium whitespace-nowrap"
        class:text-white={activeIndex === i}
        class:text-black={activeIndex !== i}
        class:dark:text-black={activeIndex === i}
        class:dark:text-white={activeIndex !== i}
        onclick={() => activeIndex = i}
        type="button"
      >
        {tab}
      </button>
    {/each}
  </div>
  
  <style>
    .custom-easing {
      transition-timing-function: cubic-bezier(0.34, 1.25, 0.7, 1);
    }
  </style>