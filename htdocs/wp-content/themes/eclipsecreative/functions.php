<?php
// Fix Admin bar positioning
function add_header_styles() {
if ( is_admin_bar_showing() ) { ?>
<style>
    .contain-to-grid{
        margin-top: 32px; 
    }
    @media screen and (max-width: 600px) { 
        .contain-to-grid {
            margin-top: 46px; 
        } 
    #wpadminbar {
        position: fixed !important; 
    }
  }
</style>
<?php } ?>
<?php } ?>
<?php add_action('wp_head', 'add_header_styles'); 

//Remove emoji scripts and styles
remove_action( 'wp_head', 'print_emoji_detection_script', 7 ); 
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' ); 
remove_action( 'wp_print_styles', 'print_emoji_styles' ); 
remove_action( 'admin_print_styles', 'print_emoji_styles' );

// Use Foundation jQuery
function my_enqueued_assets() {
    wp_deregister_script( 'jquery' );
    wp_enqueue_script( 'jquery', get_stylesheet_directory_uri() . '/bower_components/jquery/dist/jquery.js', array(), '3.2.1' );
}
add_action( 'wp_enqueue_scripts', 'my_enqueued_assets' );

// Theme setup
function eclipsecreative_setup() {
    //translations
    load_theme_textdomain('eclipsecreative', get_template_directory() . '/languages');

    //register our nav menu
    register_nav_menus( array( 
        'main_menu'  => 'Main Menu',
        'footer_menu'   => 'Footer Menu'
         ) 
    );

    //add-image options to the post
    add_theme_support('post-thumbnails');

    // Add title
    add_theme_support( 'title-tag' );
    if ( ! function_exists( '_wp_render_title_tag' ) ) {
        function theme_slug_render_title() {
    ?>
    <title><?php wp_title( '|', true, 'right' ); ?></title>
    <?php
        }
        add_action( 'wp_head', 'theme_slug_render_title' );
    }

}
add_action('after_setup_theme', 'eclipsecreative_setup');

// Add body classes for browsers
function browser_body_class($classes) {
    global $is_lynx, $is_gecko, $is_IE, $is_opera, $is_NS4, $is_safari, $is_chrome, $is_iphone;

    if ($is_lynx) {
        $classes[] = 'lynx';
    } elseif ($is_gecko) {
        $classes[] = 'gecko';
    } elseif ($is_opera) {
        $classes[] = 'opera';
    } elseif ($is_NS4) {
        $classes[] = 'ns4';
    } elseif ($is_safari) {
        $classes[] = 'safari';
    } elseif ($is_chrome) {
        $classes[] = 'chrome';
    } elseif ($is_IE) {
        $classes[] = 'ie';
    } else {
        $classes[] = 'unknown_browser';
    }

    if ($is_iphone) {
        $classes[] = 'iphone';
    }

    return $classes;
}
add_filter('body_class', 'browser_body_class');


// Allow SVG Uploads
function add_svg_to_upload_mimes( $upload_mimes ) {
    $upload_mimes['svg'] = 'image/svg+xml';
    return $upload_mimes;
}
add_filter( 'upload_mimes', 'add_svg_to_upload_mimes', 10, 1 );